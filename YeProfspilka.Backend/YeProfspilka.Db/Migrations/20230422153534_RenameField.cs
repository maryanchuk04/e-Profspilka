using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YeProfspilka.Db.Migrations
{
    public partial class RenameField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Desctiption",
                table: "Events",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Events",
                newName: "Desctiption");
        }
    }
}
