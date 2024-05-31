"use client";
import React from "react";
import BreadCrumb from "./bread-crumb";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

const breadCrumb = [
  { title: "Home", url: "../" },
  { title: "Edit Product", url: "../edit/" },
];

interface EditProductProps {
  id: string;
}

interface Product {
  title: string;
  description: string;
  price: number;
}

const EditProduct: React.FC<EditProductProps> = ({ id }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    defaultValues: async () => {
      const product = await getProduct(id);
      return product || {};
    },
  });

  const onSubmit: SubmitHandler<Product> = async (data) => {
    try {
      const res = await fetch(`../api/${id}/`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      const { message } = await res.json();
      alert(message);
      router.push("../");
    } catch (error) {
      console.log("Failed to update product", error);
      alert("Failed to update product");
    }
  };

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

  React.useEffect(() => {
    (async () => {
      const product = await getProduct(id);
      if (product) reset(product);
    })();
  }, [id, reset]);

  return (
    <div>
      <BreadCrumb lists={breadCrumb} />
      <h4 className="mb-2">Edit Product</h4>
      <div className="mb-2">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  className="form-control"
                  {...register("title", { required: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  {...register("description", { required: true })}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  className="form-control"
                  {...register("price", { required: true })}
                />
              </div>
              <div className="mb-3 text-end">
                <input type="submit" className="btn btn-primary" />
              </div>
              {errors.title && <span>This field is required</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
