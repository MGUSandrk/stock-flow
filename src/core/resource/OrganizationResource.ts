'use server';
import { redirect } from 'next/navigation';
import { AuthService } from '../services/AuthService';
import { organizationService } from '../services/OrganizationService';

export async function createOrganization(formData: FormData) {

  const name = formData.get('name') as string;
  const slug = name.toLowerCase().replace(/\s+/g, '-'); // Generación simple de slug

  try {
    const user = await AuthService.validateSession()
    await organizationService.create({ name, slug, userId: user.id })
  } catch (error) {
    return {success : false, error: error };}
  
  redirect('/dashboard');
}

export async function getOrganizationByUser() {
  try {
    const user = await AuthService.validateSession()
    const organization = await organizationService.getOrganizationByUser(user.id)
    return organization
  } catch (error) {
    redirect('/create-org') // O manejar el error de otra forma}
  }
}