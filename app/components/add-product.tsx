"use client";
import React from "react";
import BreadCrumb from "./bread-crumb";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

const breadCrumb = [
  { title: "Home", url: "../" },
  { title: "Add New Product", url: "../add/" },
];

interface FormData {
  title: string;
  description: string;
  price: number;
}

const AddProduct: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch("../api", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      const { message } = await res.json();
      alert(message);
      router.push("../");
    } catch (error) {
      console.log("Failed to add product", error);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <BreadCrumb lists={breadCrumb} />
      <h4 className="mb-2">Add New Product</h4>
      <div className="mb-2">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  id="title"
                  className="form-control"
                  {...register("title", { required: true })}
                />
                {errors.title && <p className="text-danger">Title is required</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description && <p className="text-danger">Description is required</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="form-control"
                  {...register("price", { required: true, valueAsNumber: true })}
                />
                {errors.price && <p className="text-danger">Price is required</p>}
              </div>
              <div className="mb-3 text-end">
                <input type="submit" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
