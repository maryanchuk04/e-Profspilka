using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YeProfspilka.Db.Migrations
{
    public partial class Discount_Type_For_Discoiunt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOpen",
                table: "Discounts");

            migrationBuilder.RenameColumn(
                name: "IsPaidDues",
                table: "StudentsStore",
                newName: "IsMemberProf");

            migrationBuilder.AddColumn<int>(
                name: "DiscountType",
                table: "Discounts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountType",
                table: "Discounts");

            migrationBuilder.RenameColumn(
                name: "IsMemberProf",
                table: "StudentsStore",
                newName: "IsPaidDues");

            migrationBuilder.AddColumn<bool>(
                name: "IsOpen",
                table: "Discounts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
