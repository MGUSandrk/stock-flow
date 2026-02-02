/**
 * Tipos de errores categorizados de nuestra aplicación.
 * Equivalente a tener distintas clases de Excepción en Java.
 */
export type ErrorType = 
  | 'VALIDATION_ERROR' // 400 Bad Request
  | 'AUTH_ERROR'       // 401 Unauthorized / 403 Forbidden
  | 'NOT_FOUND'        // 404 Not Found
  | 'BUSINESS_ERROR'   // 422 Unprocessable Entity (Reglas de negocio)
  | 'SYSTEM_ERROR';    // 500 Internal Server Error

/**
 * Clase centralizada de errores.
 * Hereda de Error nativo para mantener compatibilidad con herramientas de monitoreo (Sentry).
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly isOperational: boolean;
  public readonly errors?: Record<string, string[]>; // Para errores de validación de campos (Zod)

  /**
   * @param type Categoría del error
   * @param message Mensaje seguro para mostrar (o loguear)
   * @param isOperational True si es un error controlado (ej: input inválido), False si es un crash inesperado.
   * @param errors Detalle opcional de campos (útil en formularios)
   */
  constructor(
    type: ErrorType, 
    message: string, 
    isOperational = true,
    errors?: Record<string, string[]>
  ) {
    super(message);
    
    // Restaurar el prototipo es crucial en TS al extender clases nativas
    // para que 'instanceof AppError' funcione correctamente.
    Object.setPrototypeOf(this, new.target.prototype);

    this.type = type;
    this.isOperational = isOperational;
    this.errors = errors;
    this.name = 'AppError';

    // Captura el stack trace excluyendo el constructor de esta clase
    // Equivalente a Thread.currentThread().getStackTrace() pero más limpio.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Factory method para errores de validación (Bad Request)
   * Similar a lanzar una BindException en Spring.
   */
  static validation(message: string, fieldErrors?: Record<string, string[]>) {
    return new AppError('VALIDATION_ERROR', message, true, fieldErrors);
  }

  /**
   * Factory method para errores de autenticación/permisos
   * Similar a AccessDeniedException.
   */
  static unauthorized(message: string = 'No autorizado para realizar esta acción') {
    return new AppError('AUTH_ERROR', message, true);
  }
  
  /**
   * Factory method para errores de sistema (Database down, 3rd party API fail)
   * Similar a RuntimeException genérica.
   */
  static system(message: string) {
    // isOperational = false porque esto no debería pasar en flujo normal
    return new AppError('SYSTEM_ERROR', message, false); 
  }
}