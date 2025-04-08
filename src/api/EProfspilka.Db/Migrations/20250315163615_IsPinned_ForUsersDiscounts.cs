﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EProfspilka.Db.Migrations
{
    /// <inheritdoc />
    public partial class IsPinned_ForUsersDiscounts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPinned",
                table: "UserDiscounts",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPinned",
                table: "UserDiscounts");
        }
    }
}
