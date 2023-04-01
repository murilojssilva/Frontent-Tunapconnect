export function formatMoneyPt_BR (number: number) {
  return new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 2 
  }).format(number)
}