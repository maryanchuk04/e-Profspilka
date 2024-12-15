FROM mcr.microsoft.com/dotnet/aspnet:6.0 as base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /EProfspilka.

COPY . .

RUN dotnet restore "./EProfspilka.API/EProfspilka.API.csproj"
COPY . .
WORKDIR "/EProfspilka./EProfspilka.API"
RUN dotnet build "EProfspilka.API.csproj" -c Release -o /app

FROM build as publish
RUN dotnet publish "EProfspilka.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENV ASPNETCORE_URLS=http://*:5001

EXPOSE 5001
ENTRYPOINT ["dotnet", "EProfspilka.API.dll"]