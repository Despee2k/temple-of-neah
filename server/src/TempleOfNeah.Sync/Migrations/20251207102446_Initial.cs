using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TempleOfNeah.Sync.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "cardanoindexer");

            migrationBuilder.CreateTable(
                name: "BalanceByAddress",
                schema: "cardanoindexer",
                columns: table => new
                {
                    Address = table.Column<string>(type: "text", nullable: false),
                    Balance = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BalanceByAddress", x => x.Address);
                });

            migrationBuilder.CreateTable(
                name: "ReducerStates",
                schema: "cardanoindexer",
                columns: table => new
                {
                    Name = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    LatestIntersectionsJson = table.Column<string>(type: "text", nullable: false),
                    StartIntersectionJson = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReducerStates", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "UtxoByAddress",
                schema: "cardanoindexer",
                columns: table => new
                {
                    TxHash = table.Column<string>(type: "text", nullable: false),
                    OutputIndex = table.Column<long>(type: "bigint", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Amount = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    Slot = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    SpentAtSlot = table.Column<decimal>(type: "numeric(20,0)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UtxoByAddress", x => new { x.TxHash, x.OutputIndex });
                });

            migrationBuilder.CreateIndex(
                name: "IX_UtxoByAddress_Address",
                schema: "cardanoindexer",
                table: "UtxoByAddress",
                column: "Address");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BalanceByAddress",
                schema: "cardanoindexer");

            migrationBuilder.DropTable(
                name: "ReducerStates",
                schema: "cardanoindexer");

            migrationBuilder.DropTable(
                name: "UtxoByAddress",
                schema: "cardanoindexer");
        }
    }
}
