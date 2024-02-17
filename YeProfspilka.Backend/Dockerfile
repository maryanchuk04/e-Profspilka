FROM mcr.microsoft.com/dotnet/aspnet:6.0 as base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /YeProfspilka.Backend

COPY . .

RUN dotnet restore "./YeProfspilka.Backend/YeProfspilka.API"
COPY . .
WORKDIR "/YeProfspilka.Backend/YeProfspilka.API"
RUN dotnet build "YeProfspilka.API.csproj" -c Release -o /app

FROM build as publish
RUN dotnet publish "YeProfspilka.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://*:5001

EXPOSE 5001
ENTRYPOINT ["dotnet", "College.API.dll"]