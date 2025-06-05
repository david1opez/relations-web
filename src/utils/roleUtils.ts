export const translateRole = (role?: string): string => {
  if (!role) return 'Sin rol asignado'
  if (role.toLowerCase() === 'admin') return 'Administrador'
  if (role.toLowerCase() === 'colaborator') return 'Colaborador'
  return role
} 