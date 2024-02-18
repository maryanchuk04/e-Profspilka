param(
    [string]$DbUser,
    [string]$DbPassword
)

if (-not $DbUser -or -not $DbPassword) {
    Write-Host "Error: Missing required parameters. Please provide all required parameters."
    return
}

function Update-Config {
    param (
        [string]$JsonFilePath,
        [string]$User,
        [string]$Password
    )

    if (-not $JsonFilePath -or -not $User -or -not $Password) {
        Write-Host "Error: Missing required parameters. Please provide all required parameters."
        return
    }
    Write-Host ""
    Write-Host "Updating backend configuration: $JsonFilePath"
    Write-Host ""
    $connString = "Server=185.205.210.198:1433;Database=e-profspilka;user id = $User; password = $password;MultipleActiveResultSets=true;";

    $jsonContent = Get-Content $JsonFilePath | ConvertFrom-Json
    $jsonContent.ConnectionStrings.ApplicationDbConnectionString = $connString
    $jsonContent | ConvertTo-Json | Set-Content $JsonFilePath -Force
}


Write-Host ""
Write-Host "Set Environment variables and settings 🏃‍♂️🌄"

$settingsJsonPath = "./YeProfspilka.Backend/YeProfspilka.API/appsettings.json"

Write-Host ""
Write-Host "Db User: $DbUser"
Write-Host "DbPassword: $DbPassword"

Update-Config -JsonFilePath $settingsJsonPath -User $DbUser -Password $DbPassword
Write-Host ""
Write-Host "Finish!!!🔥"
