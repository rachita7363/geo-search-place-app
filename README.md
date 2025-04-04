# GeoDB Cities Search Application

## Table of Contents

- Architecture Overview

- Core Components

  - SearchInput

  - Table

  - Pagination

- State Management

- API Integration

- Performance Considerations

- Areas for Improvement

- Local Setup

## Architecture Overview

The application implements a clean, component-based architecture with:

- **Unidirectional data flow** following React best practices

- **Context API** for global state management

- **Custom hooks** for API interactions

- **Responsive design** without CSS frameworks

Key technical decisions:

- Debounced search inputs to optimize API calls

- Memoized components to prevent unnecessary re-renders

- Comprehensive error handling and loading states

## Core Components

### SearchInput

![alt text](screenshots/image.png)

**Technical Implementation:**

- Debounced input with 500ms delay to minimize API calls

- Keyboard shortcut (Ctrl+/) implementation using event listeners

- Controlled component pattern with React state

- Clean focus/blur states with CSS transitions

- Accessibility-compliant with proper ARIA attributes

**Key Features:**

```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === '/') {
    e.preventDefault();
    inputRef.current?.focus();
  }
};
```

### Table

![alt text](screenshots/image-1.png)

**Technical Implementation:**

- Dynamic rendering with virtualization considerations

- Responsive design with pure CSS

- Comprehensive empty states (loading, error, no results)

### Pagination

![alt text](screenshots/image-2.png)

**Technical Implementation:**

- Three-column layout (10%-80%-10%) with flexbox

- Dynamic page calculation from API metadata

- Controlled component pattern with disabled states

- Limit selector with range validation

- Abort controller integration for pending requests

## State Management

**Context API Implementation:**

```typescript
interface GeoDBContextValue {
  query: string;
  setQuery: (q: string) => void;
  cities: GeoDBCityResponse | null;
  setCities: (res: GeoDBCityResponse | null) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  error: string | null;
  setError: (e: string | null) => void;
  limit: number;
  setLimit: (l: number) => void;
  offset: number;
  setOffset: (o: number) => void;
}
```

**Optimizations:**

- Memoized context value to prevent unnecessary re-renders

- Separated state concerns (search, pagination, UI)

- Derived state calculation for pagination

## API Integration

**Custom Hook Implementation:**

```typescript
const useFetchCities = (query: string, limit: number, offset: number) => {
  const [results, setResults] = useState<GeoDBCityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cleanup and request implementation
  }, [query, limit, offset]);
};
```

**Key Features:**

- Comprehensive error states

- Loading state management

## Areas for Improvement

1. **Advanced Features:**

    - Client-side caching with IndexedDB

    - Advanced error recovery strategies

2. **Performance Enhancements:**

    - Virtualized scrolling for large datasets

    - Web Workers for heavy computations

    - Prefetching of paginated data

    - Skeleton loading states

3. **Developer Experience:**

    - Comprehensive TypeScript interfaces

    - Unit test coverage

## Local Setup

### Prerequisites

- Node.js v22.14.0

- npm v10.9.2

### Installation

```bash
git clone https://github.com/your-repo/geo-db-search.git
cd geo-db-search
npm install
```

### Configuration

Create `.env` file:

```bash
REACT_APP_GEO_DB_API_KEY=your_api_key_here
REACT_APP_GEO_DB_BASE_URL=https://wft-geo-db.p.rapidapi.com/v1/geo
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```
