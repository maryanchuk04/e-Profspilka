$codePath = (Get-Location).ToString()

# Ask the user which service to run (Angular, React, or Both)
$selectedService = Read-Host "Select service to run (AUI for Angular, RUI for React, or leave empty for both):"

$dotnetSolutionPath = $codePath + '\YeProfspilka.Backend'
$backendApp = '.\YeProfspilka.Backend\YeProfspilka.API\YeProfspilka.API'
$reactAppPath = $codePath + "\YeProfspilka.Frontend"
$angularAppPath = $codePath + "\YeProfspilka.Admin"

function Get-PidNumber($port) {
	$pidNumberPattern = "\d+$"
	$foundProcesses = netstat -ano | findstr :$port
	$processes = $foundProcesses | Select-String -Pattern $portPattern
	$firstMatch = $processes.Matches.Get(0).Value
	return [regex]::match($firstMatch, $pidNumberPattern).Value
}

# Build dotnet app
dotnet build $dotnetSolutionPath

if ($LASTEXITCODE -ne 0) {
	Write-Host "Build .NET APP Finished with error."
	exit 1
}

Write-Host "*************************🔥 Starting YeProfspilka API 🔥*************************"
Write-Host "$($backendApp).csproj"
$dotnetProcess = Start-Process -FilePath dotnet -ArgumentList "watch run --verbosity m --project $($backendApp).csproj" -PassThru
Start-Sleep -Seconds 2

if ($selectedService -eq "AUI") {
	$uiAppPath = $angularAppPath
	$portPattern = ":4200\s.+LISTENING\s+\d+$"
	$port = 4200
}
elseif ($selectedService -eq "RUI") {
	$uiAppPath = $reactAppPath
	$portPattern = ":3000\s.+LISTENING\s+\d+$"
	$port = 3000
}
else {
	$uiAppPath = $reactAppPath
	$portPattern = ":3000\s.+LISTENING\s+\d+$"
	$port = 3000
}

# Check if the selected UI service is already running
$foundUI = netstat -ano | findstr :$port

Write-Host "*************************🔥 Starting YeProfspilka $($selectedService) 🔥*************************"

if ($foundUI | Select-String -Pattern $portPattern -Quiet) {
	Write-Host "UI is already running on port $port..."
	$pidNumber = Get-PidNumber $port
	$npm = Get-Process -Id $pidNumber
}
else {
	Write-Host "Starting UI on port $port"
	Set-Location $uiAppPath
	Start-Process -FilePath npm -ArgumentList "run start" -PassThru
	Start-Sleep -Seconds 25
	Start-Process "http://localhost:$port" -PassThru
	Set-Location $codePath
	$pidNumber = Get-PidNumber $port
	$npm = Get-Process -Id $pidNumber
}

Write-Host "💀 We can do this! 💀"

Read-Host -Prompt '🔥🛑 Press the <ANY> key to quit and kill all services'

# Stop all processes
$dotnetProcess | Stop-Process -Force -ErrorAction SilentlyContinue
$npm | Stop-Process -Force
