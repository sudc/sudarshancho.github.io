# CSV Splitting Instructions

## Quick Start

### Step 1: Run the Split Script

Open PowerShell/Terminal and run:

```powershell
python split-csv.py
```

Or if that doesn't work:
```powershell
py split-csv.py
```

Or use Python 3 directly:
```powershell
python3 split-csv.py
```

### Step 2: What Happens

The script will:
- ✅ Read `src/assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv`
- ✅ Split hotels by city into separate files
- ✅ Create `src/assets/data/hotels/` directory
- ✅ Generate one CSV per city (e.g., `mumbai.csv`, `delhi.csv`)
- ✅ Create `index.json` with city metadata
- ✅ Show progress and file sizes

### Step 3: Verify Results

Check that files were created:
```powershell
ls src/assets/data/hotels/
```

You should see:
- `index.json` - Index file
- `mumbai.csv` - Hotels in Mumbai
- `delhi.csv` - Hotels in Delhi
- ... (one file per city)

### Step 4: Remove Original Large File

Once split files are created and tested:

```powershell
git rm --cached src/assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv
del src/assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv
```

### Step 5: Commit Split Files

```powershell
git add src/assets/data/hotels/
git add .gitignore
git add src/app/core/services/agoda-data/
git commit -m "Split large CSV by city to fix GitHub size limit"
git push
```

## Troubleshooting

### Python Not Found
- Install Python from https://www.python.org/downloads/
- Or use Anaconda/Miniconda

### Script Errors
- Check that CSV file exists in `src/assets/`
- Check CSV headers - script looks for 'city' column
- If column name is different, edit `split-csv.py` line 30

### Files Too Large
If some city files are still > 90MB:
1. Check output - script warns about oversized files
2. Split those cities by region or country
3. Or use external hosting for those specific cities

### Memory Issues
If CSV is too large to load in memory:
1. Use chunk processing (modify script)
2. Or split manually using command-line tools:
   ```powershell
   # Example: Split by 100k lines
   Split-Path -Path src/assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv -ChunkSize 100000
   ```

## Manual Split (Alternative)

If Python script doesn't work, use PowerShell:

```powershell
# Create output directory
New-Item -ItemType Directory -Force -Path src/assets/data/hotels

# Read CSV and group by city (simplified example)
$csv = Import-Csv "src/assets/E342B777-64FD-4A49-9C9F-FEF4BA635863_EN.csv"
$cities = $csv | Group-Object -Property City

foreach ($city in $cities) {
    $cityName = $city.Name -replace '[^a-zA-Z0-9-]', '_'
    $city.Group | Export-Csv "src/assets/data/hotels/$cityName.csv" -NoTypeInformation
    Write-Host "Created $cityName.csv with $($city.Count) hotels"
}
```

Note: PowerShell approach may be slower for large files.

## Testing

After splitting, test the application:

```bash
npm start
```

Navigate to homepage - you should see hotels loading from the split files.

Check browser console for any errors.

## Need Help?

- Script source: `split-csv.py`
- Service code: `src/app/core/services/agoda-data/agoda-data.service.ts`
- Data directory: `src/assets/data/hotels/`
- Documentation: `src/assets/data/hotels/README.md`
