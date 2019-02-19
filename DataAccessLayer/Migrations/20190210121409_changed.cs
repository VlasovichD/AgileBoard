using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class changed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsHead",
                table: "Tickets");

            migrationBuilder.AddColumn<int>(
                name: "PreviousTicketId",
                table: "Tickets",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PreviousTicketId",
                table: "Tickets");

            migrationBuilder.AddColumn<bool>(
                name: "IsHead",
                table: "Tickets",
                nullable: false,
                defaultValue: false);
        }
    }
}
