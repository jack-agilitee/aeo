# API Integration Documentation

## Overview

This document outlines the API integration patterns, best practices, and guidelines for the AEO Ionic Angular application. It covers HTTP client setup, service architecture, error handling, and data management.

## HTTP Client Setup

### Angular HttpClient

The application uses Angular's HttpClient for all HTTP operations:

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.example.com/v1';
  
  constructor(private http: HttpClient) {}
}
```

### Environment Configuration

API URLs are configured in environment files:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiVersion: 'v1'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com/api',
  apiVersion: 'v1'
};
```

## Service Architecture

### Base API Service

Create a base service for common HTTP operations:

```typescript
@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected baseUrl = environment.apiUrl;
  
  constructor(protected http: HttpClient) {}
  
  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }
  
  protected post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }
  
  protected put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data);
  }
  
  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`);
  }
}
```

### Feature-Specific Services

Extend the base service for specific features:

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {
  
  getUsers(): Observable<User[]> {
    return this.get<User[]>('users');
  }
  
  getUserById(id: string): Observable<User> {
    return this.get<User>(`users/${id}`);
  }
  
  createUser(user: CreateUserRequest): Observable<User> {
    return this.post<User>('users', user);
  }
  
  updateUser(id: string, user: UpdateUserRequest): Observable<User> {
    return this.put<User>(`users/${id}`, user);
  }
  
  deleteUser(id: string): Observable<void> {
    return this.delete<void>(`users/${id}`);
  }
}
```

## Data Models

### TypeScript Interfaces

Define TypeScript interfaces for API data:

```typescript
// src/app/models/user.model.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

### Response Transformation

Transform API responses to match application models:

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {
  
  getUsers(): Observable<User[]> {
    return this.get<ApiResponse<User[]>>('users').pipe(
      map(response => response.data),
      map(users => users.map(user => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt)
      })))
    );
  }
}
```

## Error Handling

### HTTP Error Interceptor

Create an interceptor for global error handling:

```typescript
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  
  constructor(private toastCtrl: ToastController) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(error);
      })
    );
  }
  
  private async handleError(error: HttpErrorResponse) {
    let message = 'An error occurred';
    
    switch (error.status) {
      case 400:
        message = 'Bad request';
        break;
      case 401:
        message = 'Unauthorized';
        break;
      case 403:
        message = 'Forbidden';
        break;
      case 404:
        message = 'Not found';
        break;
      case 500:
        message = 'Server error';
        break;
    }
    
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'danger'
    });
    
    await toast.present();
  }
}
```

### Service-Level Error Handling

Handle errors at the service level:

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {
  
  getUsers(): Observable<User[]> {
    return this.get<User[]>('users').pipe(
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
```

## Authentication

### JWT Token Management

Implement JWT token handling:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  
  constructor(private http: HttpClient) {}
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/auth/login', credentials).pipe(
      tap(response => this.setToken(response.token))
    );
  }
  
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
```

### Auth Interceptor

Add authentication headers to requests:

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}
```

## Loading States

### Loading Service

Manage loading states across the application:

```typescript
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  
  show(): void {
    this.loadingSubject.next(true);
  }
  
  hide(): void {
    this.loadingSubject.next(false);
  }
}
```

### Loading Interceptor

Show loading indicators for HTTP requests:

```typescript
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  
  constructor(private loadingService: LoadingService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    
    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
```

## Caching

### HTTP Cache Implementation

Implement caching for API responses:

```typescript
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes
  
  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    
    this.cache.delete(key);
    return null;
  }
  
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  clear(): void {
    this.cache.clear();
  }
}
```

## Offline Support

### Network Status Detection

Detect network connectivity:

```typescript
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private networkStatus = new BehaviorSubject<boolean>(navigator.onLine);
  public networkStatus$ = this.networkStatus.asObservable();
  
  constructor() {
    window.addEventListener('online', () => this.networkStatus.next(true));
    window.addEventListener('offline', () => this.networkStatus.next(false));
  }
  
  isOnline(): boolean {
    return this.networkStatus.value;
  }
}
```

### Offline Queue

Queue requests when offline:

```typescript
@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private queue: QueuedRequest[] = [];
  
  constructor(
    private networkService: NetworkService,
    private http: HttpClient
  ) {
    this.networkService.networkStatus$.subscribe(online => {
      if (online) {
        this.processQueue();
      }
    });
  }
  
  queueRequest(request: QueuedRequest): void {
    this.queue.push(request);
  }
  
  private processQueue(): void {
    while (this.queue.length > 0) {
      const request = this.queue.shift();
      if (request) {
        this.executeRequest(request);
      }
    }
  }
  
  private executeRequest(request: QueuedRequest): void {
    // Execute queued request
  }
}
```

## Testing API Services

### Service Testing

Test API services with mock data:

```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should fetch users', () => {
    const mockUsers: User[] = [
      { id: '1', name: 'John', email: 'john@example.com' }
    ];
    
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    
    const req = httpMock.expectOne(`${service.baseUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});
```

## Best Practices

### API Design

1. **RESTful Endpoints**: Follow REST conventions
2. **Consistent Responses**: Use consistent response formats
3. **Pagination**: Implement pagination for large datasets
4. **Versioning**: Use API versioning for backwards compatibility

### Performance

1. **Request Optimization**: Minimize HTTP requests
2. **Response Compression**: Use gzip compression
3. **Caching**: Implement appropriate caching strategies
4. **Lazy Loading**: Load data on demand

### Security

1. **HTTPS**: Always use HTTPS for API calls
2. **Authentication**: Implement proper authentication
3. **Input Validation**: Validate all user inputs
4. **Rate Limiting**: Implement rate limiting

### Error Handling

1. **Graceful Degradation**: Handle errors gracefully
2. **User Feedback**: Provide meaningful error messages
3. **Logging**: Log errors for debugging
4. **Retry Logic**: Implement retry mechanisms

## Future Enhancements

### GraphQL Integration

Consider GraphQL for more efficient data fetching:

```typescript
@Injectable({
  providedIn: 'root'
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}
  
  query<T>(query: DocumentNode, variables?: any): Observable<T> {
    return this.apollo.query<T>({
      query,
      variables
    }).pipe(
      map(result => result.data)
    );
  }
}
```

### WebSocket Support

Add real-time communication:

```typescript
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  
  connect(url: string): void {
    this.socket = new WebSocket(url);
    
    this.socket.onmessage = (event) => {
      // Handle incoming messages
    };
  }
  
  send(message: any): void {
    this.socket.send(JSON.stringify(message));
  }
}
```

### API Mocking

Implement API mocking for development:

```typescript
@Injectable({
  providedIn: 'root'
})
export class MockApiService {
  private mockData = {
    users: [
      { id: '1', name: 'John', email: 'john@example.com' }
    ]
  };
  
  getUsers(): Observable<User[]> {
    return of(this.mockData.users).pipe(
      delay(1000) // Simulate network delay
    );
  }
}
```