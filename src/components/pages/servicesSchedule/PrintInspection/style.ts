import { css } from '@emotion/css';

export const localStyleCss = css`
  hr {
    border: none;
    border-bottom: thin solid #aaa;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.44rem;
    height: 1px;
  }
  table.checks {
    font-size: 0.5rem;
  }
  table.checks tr td {
    vertical-align: middle;
  }
  table.checks tr td:last-child {
    padding: 0.6mm 0.8mm;
  }
  table.checks tr:not(:last-child) td {
    border-bottom: 0.01mm solid #eee;
  }
  table.checks.last-checks td {
    padding: 0.4mm 0.8mm;
  }
  table.checks.last-checks td[rowspan] {
    border: none;
  }
  table.checks.last-checks td:last-child {
    padding: 0;
  }
  table tr {
    height: 100%;
  }
  table td {
    height: 100%;
  }
  table td > div {
    height: 100%;
  }
  table.bordered td,
  table.bordered th {
    border: thin solid #000;
    padding: 1px 2px;
  }
  table.table-head th {
    background-color: #ddd;
  }
  table.cell-h-sm th,
  table.cell-h-sm td {
    height: 4.3mm;
  }
`