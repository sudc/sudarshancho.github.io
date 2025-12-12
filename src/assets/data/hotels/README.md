# Hotel Data - Split by City

This directory contains Agoda hotel data split into smaller CSV files by city to stay under GitHub's 100MB file size limit.

## How to Generate Split Files

1. Place the large CSV file: `src/assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv`

2. Run the split script:
   ```bash
   python split-csv.py
   ```

3. This creates:
   - Multiple city-specific CSV files in `src/assets/data/hotels/`
   - An `index.json` file for quick lookups
   - Each city file stays under 90MB (GitHub limit is 100MB)

## File Structure

```
src/assets/data/hotels/
├── index.json           # Index of all cities with metadata
├── mumbai.csv          # Hotels in Mumbai
├── delhi.csv           # Hotels in Delhi
├── bangalore.csv       # Hotels in Bangalore
└── ... (more cities)
```

## index.json Format

```json
{
  "cities": {
    "Mumbai": {
      "filename": "mumbai.csv",
      "hotel_count": 1234,
      "size_mb": 45.2
    }
  },
  "total_cities": 50,
  "total_hotels": 50000,
  "csv_headers": ["hotel_id", "hotel_name", "city", ...]
}
```

## Usage in Code

The `AgodaDataService` automatically loads city-specific files:

```typescript
// Load specific city
agodaService.loadHotelsByCity('Mumbai').subscribe(hotels => {
  console.log(hotels);
});

// Load multiple cities
agodaService.loadHotelsByCities(['Mumbai', 'Delhi']).subscribe(hotels => {
  console.log(hotels);
});

// Get available cities
agodaService.getAvailableCities().subscribe(cities => {
  console.log(cities);
});

// Load featured hotels from popular cities (default)
agodaService.loadHotelData().subscribe(hotels => {
  console.log(hotels);
});
```

## Benefits

✅ Stay under GitHub's 100MB file size limit  
✅ Faster loading - only load data for cities you need  
✅ Better caching - city data cached separately  
✅ Scalable - easy to add new cities  
✅ Version control friendly - smaller diffs when data changes  

## Popular Cities Pre-loaded

By default, the service loads hotels from these popular cities:
- Mumbai
- Delhi
- Bangalore
- Goa
- Jaipur
- Chennai
- Kolkata
- Hyderabad
- Pune
- Udaipur

You can customize this list in `agoda-data.service.ts`.
