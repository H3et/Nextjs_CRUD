"use client";
import React from "react";
import BreadCrumb from "./bread-crumb";
import { useForm } from "react-hook-form";

const breadCrumb = [
  { title: "Home", url: "../" },
  { title: "View Product", url: "../view/" },
];

interface ViewProductProps {
  id: string;
}

interface Product {
  title: string;
  description: string;
  price: number;
}

const ViewProduct: React.FC<ViewProductProps> = ({ id }) => {
  const { register } = useForm<Product>({
    defaultValues: async () => {
      const product = await getProduct(id);
      return product || {};
    },
  });

  const getProduct = async (id: string): Promise<Product | undefined> => {
    try {
      const res = await fetch(`../api/${id}`);
      if (!res.ok) {
        throw new Error("Failed to get product");
      }

      const { product } = await res.json();
      return product;
    } catch (error) {
      alert("Failed to get product");
    }
  };

  return (
    <div>
      <BreadCrumb lists={breadCrumb} />
      <h4 className="mb-2">View Product</h4>
      <div className="mb-2">
        <div className="row">
          <div className="col-md-6">
            <form method="POST">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  className="form-control"
                  {...register("title", { disabled: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  {...register("description", { disabled: true })}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  className="form-control"
                  {...register("price", { disabled: true })}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
