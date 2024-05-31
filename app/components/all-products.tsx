"use client";
import React, { useEffect, useState } from "react";
import DataTable from "./dataTable";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

const cols = ["ID", "TITLE", "DESCRIPTION", "PRICE"];

const AllProducts: React.FC = () => {
  const [rows, setRows] = useState<Product[]>([]);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const res = await fetch("/api/");
        if (!res.ok) {
          throw new Error("Error fetching products");
        }

        const { products } = await res.json();
        setRows(products);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    }

    getAllProducts();
  }, []);

  return <DataTable cols={cols} rows={rows} />;
};

export default AllProducts;
