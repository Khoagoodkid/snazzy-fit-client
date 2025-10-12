import { privateAxios } from "@/middleware/axiosInstance";
import { CreateAddressRequest, CreateAddressResponse, UpdateAddressRequest, UpdateAddressResponse, DeleteAddressResponse, GetAddressesResponse } from "@/types/address/address.interface";
import { useCallback, useState } from "react";

export const useAddressService = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getAddresses = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await privateAxios.get<GetAddressesResponse>("/api/addresses");
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createAddress = useCallback(async (address: CreateAddressRequest) => {
        setIsLoading(true);
        try {
            const response = await privateAxios.post<CreateAddressResponse>("/api/addresses", address);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateAddress = useCallback(async (address: UpdateAddressRequest) => {

        setIsLoading(true);
        try {
            const response = await privateAxios.patch<UpdateAddressResponse>(`/api/addresses/${address.id}`, address);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteAddress = useCallback(async (id: string) => {

        setIsLoading(true);
        try {
            const response = await privateAxios.delete<DeleteAddressResponse>(`/api/addresses/${id}`);
            return response.data;
        } catch (error) {
            throw error as Error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        getAddresses,
        createAddress,
        updateAddress,
        deleteAddress,
    }
}