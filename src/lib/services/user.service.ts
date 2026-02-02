import { UserRepository } from '@/lib/repositories/user.repo';
import { AppError } from '@/lib/core/errors';
import { CreateProfileDTO, Profile } from '@/types';

export const UserService = {
  
  /**
   * Obtiene el perfil del usuario actual.
   * Si no existe en la tabla profiles (pero sí en Auth), podríamos optar por 
   * crearlo al vuelo (Lazy Creation) o lanzar error.
   */
  async getMyProfile(userId: string): Promise<Profile> {
    const profile = await UserRepository.findById(userId);

    if (!profile) {
      // Regla de Negocio: Si el usuario tiene cuenta Auth pero no Perfil,
      // es un estado inconsistente o es el primer login.
      throw new AppError('NOT_FOUND', 'El perfil de usuario no existe.', true);
    }

    return profile;
  },

  /**
   * Actualiza datos del perfil.
   */
  async updateProfile(userId: string, data: Partial<CreateProfileDTO>): Promise<Profile> {
    // 1. Validaciones de Negocio previas
    if (data.full_name && data.full_name.length < 3) {
      // Aunque Zod lo valide en la capa Action, el servicio es la última defensa.
      throw AppError.validation('El nombre debe tener al menos 3 caracteres');
    }

    // 2. Recuperar estado actual (si fuera necesario para lógica compleja)
    const currentProfile = await UserRepository.findById(userId);
    if (!currentProfile) {
       throw new AppError('NOT_FOUND', 'Usuario no encontrado');
    }

    // 3. Persistir
    // Combinamos ID seguro con los datos parciales
    return UserRepository.upsert({
      id: userId,
      email: currentProfile.email, // Mantenemos email original
      ...data
    });
  }
};