using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TempleOfNeah.Sync.Migrations
{
    /// <inheritdoc />
    public partial class NFTUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NftInfo",
                schema: "cardanoindexer",
                columns: table => new
                {
                    PolicyId = table.Column<string>(type: "text", nullable: false),
                    AssetName = table.Column<string>(type: "text", nullable: false),
                    Slot = table.Column<decimal>(type: "numeric(20,0)", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Image = table.Column<string>(type: "text", nullable: true)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NftInfo",
                schema: "cardanoindexer");
        }
    }
}
