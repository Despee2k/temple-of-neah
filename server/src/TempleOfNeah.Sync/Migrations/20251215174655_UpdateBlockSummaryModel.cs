using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TempleOfNeah.Sync.Migrations
{
    /// <inheritdoc />
    public partial class UpdateBlockSummaryModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NftInfo",
                schema: "cardanoindexer");

            migrationBuilder.CreateTable(
                name: "BlockSummary",
                schema: "cardanoindexer",
                columns: table => new
                {
                    BlockHash = table.Column<string>(type: "text", nullable: false),
                    Slot = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    Epoch = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    Height = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    PreviousBlockHash = table.Column<string>(type: "text", nullable: true),
                    TxCount = table.Column<int>(type: "integer", nullable: false),
                    InputCount = table.Column<int>(type: "integer", nullable: false),
                    OutputCount = table.Column<int>(type: "integer", nullable: false),
                    UniqueAddressCount = table.Column<int>(type: "integer", nullable: false),
                    TotalFees = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    TotalAdaMoved = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    TotalLovelaceMoved = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    MintCount = table.Column<int>(type: "integer", nullable: false),
                    BurnCount = table.Column<int>(type: "integer", nullable: false),
                    Timestamp = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlockSummary", x => x.BlockHash);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlockSummary_Epoch",
                schema: "cardanoindexer",
                table: "BlockSummary",
                column: "Epoch");

            migrationBuilder.CreateIndex(
                name: "IX_BlockSummary_Height",
                schema: "cardanoindexer",
                table: "BlockSummary",
                column: "Height");

            migrationBuilder.CreateIndex(
                name: "IX_BlockSummary_Slot",
                schema: "cardanoindexer",
                table: "BlockSummary",
                column: "Slot");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlockSummary",
                schema: "cardanoindexer");

            migrationBuilder.CreateTable(
                name: "NftInfo",
                schema: "cardanoindexer",
                columns: table => new
                {
                    PolicyId = table.Column<string>(type: "text", nullable: false),
                    AssetName = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Slot = table.Column<decimal>(type: "numeric(20,0)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NftInfo", x => new { x.PolicyId, x.AssetName });
                });

            migrationBuilder.CreateIndex(
                name: "IX_NftInfo_PolicyId",
                schema: "cardanoindexer",
                table: "NftInfo",
                column: "PolicyId");
        }
    }
}
