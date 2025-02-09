using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EProfspilka.Db.Migrations
{
    /// <inheritdoc />
    public partial class NewDiscountAccessField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WithBarCode",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "WithQrCode",
                table: "Discounts");

            migrationBuilder.AddColumn<byte>(
                name: "AccessTypes",
                table: "Discounts",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<string>(
                name: "PromoCode",
                table: "Discounts",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccessTypes",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "PromoCode",
                table: "Discounts");

            migrationBuilder.AddColumn<bool>(
                name: "WithBarCode",
                table: "Discounts",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "WithQrCode",
                table: "Discounts",
                type: "bit",
                nullable: true);
        }
    }
}
