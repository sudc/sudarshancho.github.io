#!/usr/bin/env python3
"""
Split large Agoda CSV file by city to stay under GitHub's 100MB limit
"""
import csv
import os
from collections import defaultdict

# Configuration
INPUT_CSV = 'src/assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv'
OUTPUT_DIR = 'src/assets/data/hotels'
MAX_FILE_SIZE_MB = 90  # Stay under 100MB with safety margin

def get_file_size_mb(filepath):
    """Get file size in MB"""
    return os.path.getsize(filepath) / (1024 * 1024)

def split_csv_by_city():
    """Split CSV by city into separate files"""
    print(f"Reading {INPUT_CSV}...")
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Read and group by city
    city_data = defaultdict(list)
    headers = None
    
    with open(INPUT_CSV, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        headers = next(reader)
        
        # Find city column index (adjust based on your CSV structure)
        city_index = None
        for i, header in enumerate(headers):
            if 'city' in header.lower():
                city_index = i
                break
        
        if city_index is None:
            print("Error: Could not find 'city' column")
            print(f"Available columns: {headers}")
            return
        
        print(f"Using column '{headers[city_index]}' for city")
        
        # Group rows by city
        row_count = 0
        for row in reader:
            if len(row) <= city_index:
                continue
            
            city = row[city_index].strip()
            if city:
                city_data[city].append(row)
                row_count += 1
                
                if row_count % 10000 == 0:
                    print(f"Processed {row_count} rows, {len(city_data)} cities...")
    
    print(f"\nTotal rows: {row_count}")
    print(f"Total cities: {len(city_data)}")
    
    # Write separate files for each city
    city_files = {}
    for city, rows in city_data.items():
        # Sanitize city name for filename
        safe_city = "".join(c if c.isalnum() or c in (' ', '-') else '_' for c in city)
        safe_city = safe_city.replace(' ', '-').lower()
        
        output_file = os.path.join(OUTPUT_DIR, f'{safe_city}.csv')
        
        with open(output_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(headers)
            writer.writerows(rows)
        
        size_mb = get_file_size_mb(output_file)
        city_files[city] = {
            'filename': f'{safe_city}.csv',
            'rows': len(rows),
            'size_mb': size_mb
        }
        
        print(f"Created {output_file} ({len(rows)} hotels, {size_mb:.2f} MB)")
    
    # Create index file
    create_city_index(city_files, headers)
    
    print(f"\n✅ Split complete! Created {len(city_files)} city files")
    print(f"📁 Files saved to: {OUTPUT_DIR}")
    
    # Check for oversized files
    oversized = [city for city, info in city_files.items() if info['size_mb'] > MAX_FILE_SIZE_MB]
    if oversized:
        print(f"\n⚠️  Warning: {len(oversized)} cities exceed {MAX_FILE_SIZE_MB}MB:")
        for city in oversized:
            print(f"  - {city}: {city_files[city]['size_mb']:.2f} MB ({city_files[city]['rows']} hotels)")
        print("  Consider splitting these by region or country")

def create_city_index(city_files, headers):
    """Create an index JSON file for quick lookup"""
    import json
    
    index = {
        'cities': {},
        'total_cities': len(city_files),
        'total_hotels': sum(info['rows'] for info in city_files.values()),
        'csv_headers': headers
    }
    
    for city, info in sorted(city_files.items()):
        index['cities'][city] = {
            'filename': info['filename'],
            'hotel_count': info['rows'],
            'size_mb': round(info['size_mb'], 2)
        }
    
    index_file = os.path.join(OUTPUT_DIR, 'index.json')
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=2)
    
    print(f"\nCreated index file: {index_file}")

if __name__ == '__main__':
    try:
        split_csv_by_city()
    except FileNotFoundError:
        print(f"Error: Could not find {INPUT_CSV}")
        print("Please ensure the CSV file exists in the correct location")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
