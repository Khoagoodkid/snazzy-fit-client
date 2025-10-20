"use client"

import { useCallback, useEffect, useRef, useState } from "react";

import { CollectionWithCategories } from "@/types/collection/collection.interface";
import { toast } from "react-toastify";
import useCollectionService from "@/services/client/collection/useCollectionService";
import { useRouter } from "next/navigation";

// Define the category data structure
const categoriesData = [
    {
        title: "MEN'S SNOW",
        items: [
            "Jackets",
            "Pants + Bibs",
            "Gloves + Mitts",
            "Goggles",
            "Hoodies + Layers",
            "Beanies",
            "Masks + Gaiters",
            "Socks",
            "Snowboards"
        ]
    },
    {
        title: "WOMEN'S SNOW",
        items: [
            "Jackets",
            "Pants + Bibs",
            "Gloves + Mitts",
            "Goggles",
            "Hoodies + Layers",
            "Beanies",
            "Masks + Gaiters",
            "Socks",
            "Snowboards"
        ]
    },
    {
        title: "GIRLS'",
        items: [
            "Jackets",
            "Pants + Bibs",
            "Gloves + Mitts"
        ]
    },
    {
        title: "BOYS'",
        items: [
            "Jackets",
            "Pants + Bibs",
            "Gloves + Mitts"
        ]
    }
]

export default function CategoriesDropdown() {
    const { getCollectionsWithCategories } = useCollectionService();
    const [collectionsWithCategories, setCollectionsWithCategories] = useState<CollectionWithCategories[]>([]);
    const fetched = useRef(false);
    const router = useRouter();

    const handleGetCollectionsWithCategories = useCallback(async () => {
        try {
            const response = await getCollectionsWithCategories();
            setCollectionsWithCategories(response.data);
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, [getCollectionsWithCategories]);

    useEffect(() => {
        if (!fetched.current) {
            handleGetCollectionsWithCategories();
            fetched.current = true;
        }
    }, [handleGetCollectionsWithCategories]);

    return (

        <div className="grid grid-cols-4 gap-6 p-6 w-[800px] bg-gray-50">
            {collectionsWithCategories.map((collection, index) => {
                const collectionName = collection.name.toLowerCase().replace(/ /g, '-')
                return (
                    <div key={index} className="space-y-3">
                        <h3 className="font-bold text-gray-800">{collection.name}</h3>
                        <hr className="border-gray-300" />
                        <ul className="space-y-2 text-sm text-gray-700">
                            {collection.categories.map((category) => {

                                const path = `/collections/${collectionName}/${category.name}`
                                return (
                                    <li key={category.id}>
                                        <span
                                            onClick={() => router.push(path)}
                                            className="hover:text-gray-900 hover:font-semibold cursor-pointer"
                                        >
                                            {category.name}
                                        </span>
                                    </li>
                                )
                            })}
                            <li>
                                <span
                                    onClick={() => router.push(`/collections/${collectionName}`)}
                                    className="hover:text-gray-900 cursor-pointer font-medium"
                                >
                                    VIEW ALL
                                </span>
                            </li>
                        </ul>
                    </div>
                )
            })}
        </div>

    )
}
