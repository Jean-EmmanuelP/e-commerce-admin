"use client";

import Layout from "@/components/Layout";
import Popup from "@/components/Popup";
import axios from "axios";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  parent?: Category;
}

interface Property {
  name: string;
  values: string;
}

export default function Categories() {
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(ev: any) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        value: p.values.split(","),
      })),
    };
    if (editedCategory) {
      await axios.put("/api/categories", { ...data, _id: editedCategory._id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);  
    }
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category: any) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(category.properties);
  }

  async function deleteCategory() {
    if (categoryToDelete) {
      await axios.delete(`/api/categories?_id=${categoryToDelete}`);
      fetchCategories();
    }
    closePopup();
  }

  function closePopup() {
    setPopupOpen(false);
    setCategoryToDelete(null);
  }

  function addProperty() {
    setProperties((prev: Property[]) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(
    index: number,
    property: Property,
    newName: string
  ) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(
    index: number,
    property: Property,
    newValues: string
  ) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove: number) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category: ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Category name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category: any) => (
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2">
                <input
                  type="text"
                  className="mb-0"
                  placeholder="property name (example: color)"
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                />
                <input
                  type="text"
                  className="mb-0"
                  placeholder="values, coma separated"
                  value={property.values}
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                />
                <button
                  className="btn-default"
                  type="button"
                  onClick={() => removeProperty(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category: any) => (
                <tr>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-primary mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCategoryToDelete(category._id);
                        setPopupOpen(true);
                      }}
                      className="btn-primary"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <Popup
        isOpen={isPopupOpen}
        onDelete={deleteCategory}
        onClose={closePopup}
      />
    </Layout>
  );
}
