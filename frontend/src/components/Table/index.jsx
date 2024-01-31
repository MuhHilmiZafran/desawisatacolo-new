// File: TableComponent.js
import React from "react";

const TableComponent = ({ data }) => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Nama</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Telepon</th>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">ID Produk</th>
          <th className="py-2 px-4 border-b">ID user</th>
          <th className="py-2 px-4 border-b">Nama Produk</th>
          <th className="py-2 px-4 border-b">Deskripsi</th>
          <th className="py-2 px-4 border-b">Harga</th>
          <th className="py-2 px-4 border-b">Amount</th>
          <th className="py-2 px-4 border-b">Total Harga</th>
          <th className="py-2 px-4 border-b">Image</th>
          <th className="py-2 px-4 border-b">Status</th>
          <th className="py-2 px-4 border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="py-2 px-4 border-b">{item.nama}</td>
            <td className="py-2 px-4 border-b">{item.email}</td>
            <td className="py-2 px-4 border-b">{item.telepon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
