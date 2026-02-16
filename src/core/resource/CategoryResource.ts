/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidatePath } from 'next/cache';
import { AuthService } from '../services/AuthService';
import { categoryService } from '../services/CategoryService';
import { ActionResponse, Category } from '../utils/types';

export async function getCategoriesAction(): Promise<ActionResponse<Category[]>> {
  try {
    const user = await AuthService.validateSession()
    const categories = await categoryService.getAll(user.id)
    return { success: true, data: categories }
  } catch (e: any) {
    return { success: false, error: e.message }}}


export async function createCategoryAction(name: string): Promise<ActionResponse<Category>> {
  try {
    const user = await AuthService.validateSession()
    const newCategory = await categoryService.create(name, user.id)
    revalidatePath('/dashboard/products')// Para refrescar selectores si es necesario
    return { success: true, data: newCategory }
  } catch (e: any) {
    console.log(e.message)
    return { success: false, error: e.message }}
}