import { ItemProdutoCompraModel } from "./item-produto-compra.model";

export interface CompraDetalhadaModel {
    compraId: number,
    dataCompra: Date,
    formaPagamento: string,
    dataPagamento: Date,
    valorTotal: number,
    itensComprados: ItemProdutoCompraModel[]
}