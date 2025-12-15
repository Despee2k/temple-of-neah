using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TempleOfNeah.Sync.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNftInfoModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "cardanoindexer",
                table: "NftInfo",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MediaType",
                schema: "cardanoindexer",
                table: "NftInfo",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MetadataJson",
                schema: "cardanoindexer",
                table: "NftInfo",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MintAddress",
                schema: "cardanoindexer",
                table: "NftInfo",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "Quantity",
                schema: "cardanoindexer",
                table: "NftInfo",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "TxHash",
                schema: "cardanoindexer",
                table: "NftInfo",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_NftInfo_MintAddress",
                schema: "cardanoindexer",
                table: "NftInfo",
                column: "MintAddress");

            migrationBuilder.CreateIndex(
                name: "IX_NftInfo_Slot",
                schema: "cardanoindexer",
                table: "NftInfo",
                column: "Slot");

            migrationBuilder.CreateIndex(
                name: "IX_NftInfo_TxHash",
                schema: "cardanoindexer",
                table: "NftInfo",
                column: "TxHash");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_NftInfo_MintAddress",
                schema: "cardanoindexer",
                table: "NftInfo");

            migrationBuilder.DropIndex(
                name: "IX_NftInfo_Slot",
                schema: "cardanoindexer",
                table: "NftInfo");

            migrationBuilder.DropIndex(
                name: "IX_NftInfo_TxHash",
                schema: "cardanoindexer",
                table: "NftInfo");

            migrationBuilder.DropColumn(
                name: "Description",
                schema: "cardanoindexer",
                table: "NftInfo");

            migrationBuilder.DropColumn(
                name: "MediaType",
                schema: "cardanoindexer",
                table: "NftInfo");

            migrationBuilder.DropColumn(
                name: "MetadataJson",
                schema: "cardanoindexer",
                table: "NftInfo");

            migrationBuilder.DropColumn(
                name: "MintAddress",
                schema: "cardanoindexer",
                table: "NftInfo");

            migrationBuilder.DropColumn(
                name: "Quantity",
                schema: "cardanoindexer",
                table: "NftInfo");

            migrationBuilder.DropColumn(
                name: "TxHash",
                schema: "cardanoindexer",
                table: "NftInfo");
        }
    }
}
