import React from "react";
import { Token } from "../types/token";

interface TokenTableProps {
  tokens: Token[];
}

const TokenTable: React.FC<TokenTableProps> = ({ tokens }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Top Tokens</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Price Change</th>
            <th>Volume 24H</th>
            <th>TVL</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td>{index + 1}</td>
              <td>{token.name}</td>
              <td>{token.price}</td>
              <td>{token.priceChange}</td>
              <td>{token.volume24h}</td>
              <td>{token.tvl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenTable;
