FROM mcr.microsoft.com/dotnet/sdk:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /YeProfspilka.Backend
COPY ["global.json", "./"]
COPY ["YeProfspilka.API/YeProfspilka.API.csproj", "YeProfspilka.API/"]
COPY ["YeProfspilka.Core/YeProfspilka.Core.csproj", "YeProfspilka.Core/"]
COPY ["YeProfspilka.Db/YeProfspilka.Db.csproj", "YeProfspilka.Db/"]
COPY ["YeProfspilka.Application/YeProfspilka.Application.csproj", "YeProfspilka.Application/"]
RUN dotnet restore "YeProfspilka.API/YeProfspilka.API.csproj"
COPY . .
WORKDIR "/YeProfspilka.Backend/YeProfspilka.API"
RUN dotnet build "YeProfspilka.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "YeProfspilka.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "YeProfspilka.API.dll"]