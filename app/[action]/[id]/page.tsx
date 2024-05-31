import React from "react";
import AddProduct from "../../components/add-product";
import DeleteProduct from "../../components/delete-product";
import EditProduct from "../../components/edit-product";
import ViewProduct from "../../components/view-product";

interface ActionProductIdProps {
  params: {
    action: "add" | "edit" | "view" | "delete";
    id?: string;
  };
}

const ActionProductId: React.FC<ActionProductIdProps> = ({ params }) => {
  const { action, id } = params;
  
  switch (action) {
    case "add":
      return <AddProduct />;
    case "edit":
      return <EditProduct id={id!} />;
    case "view":
      return <ViewProduct id={id!} />;
    case "delete":
      return <DeleteProduct id={id!} />;
      return null; 
  }
};

export default ActionProductId;
