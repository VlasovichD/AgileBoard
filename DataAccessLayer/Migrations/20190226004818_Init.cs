using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAccessLayer.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Columns",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Columns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    Username = table.Column<string>(maxLength: 50, nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: false),
                    PasswordSalt = table.Column<byte[]>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Description = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    ColumnId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Columns_ColumnId",
                        column: x => x.ColumnId,
                        principalTable: "Columns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Columns",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "TO DO" },
                    { 2, "In Progress" },
                    { 3, "Done" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "LastName", "PasswordHash", "PasswordSalt", "Username" },
                values: new object[] { 1, "John", "Smith", new byte[] { 82, 190, 124, 247, 54, 182, 128, 118, 34, 94, 68, 110, 203, 29, 215, 188, 181, 165, 51, 211, 112, 86, 105, 74, 31, 214, 75, 76, 116, 230, 126, 68, 71, 158, 102, 184, 189, 83, 53, 15, 165, 142, 134, 171, 99, 74, 67, 227, 101, 30, 170, 76, 167, 101, 87, 105, 223, 102, 117, 66, 134, 253, 126, 0 }, new byte[] { 117, 136, 59, 157, 135, 244, 200, 124, 92, 135, 60, 110, 47, 133, 255, 57, 104, 116, 193, 136, 240, 201, 135, 46, 87, 220, 160, 162, 244, 228, 136, 89, 245, 155, 119, 115, 47, 215, 138, 186, 93, 99, 178, 192, 86, 31, 130, 89, 203, 54, 155, 88, 145, 251, 141, 92, 166, 214, 194, 29, 220, 32, 100, 191, 157, 222, 171, 195, 60, 53, 239, 249, 32, 239, 126, 54, 150, 12, 31, 205, 213, 232, 148, 254, 112, 200, 204, 155, 223, 183, 242, 68, 149, 60, 156, 254, 54, 217, 218, 141, 199, 194, 57, 189, 84, 129, 250, 148, 182, 85, 238, 198, 239, 218, 106, 253, 219, 113, 224, 131, 199, 131, 207, 121, 196, 126, 212, 244 }, "user1" });

            migrationBuilder.InsertData(
                table: "Tickets",
                columns: new[] { "Id", "ColumnId", "Description", "Name", "UserId" },
                values: new object[,]
                {
                    { 1, 1, "Description 1", "Ticket 1", 1 },
                    { 2, 2, "Description 2", "Ticket 2", 1 },
                    { 3, 3, "Description 3", "Ticket 3", 1 },
                    { 4, 1, "Description 4", "Ticket 4", 1 },
                    { 5, 2, "Description 5", "Ticket 5", 1 },
                    { 6, 3, "Description 6", "Ticket 6", 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_ColumnId",
                table: "Tickets",
                column: "ColumnId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_UserId",
                table: "Tickets",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Columns");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
