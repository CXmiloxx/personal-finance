import { useAuth } from '#/AuthContext';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LockIcon, ArrowLeftIcon, CheckCircle2Icon, AlertCircleIcon } from 'lucide-react';

export default function NewPassword() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');
  const [validationChecks, setValidationChecks] = useState({
    length: false,
    letter: false,
    number: false,
    special: false
  });
  const { newPassword, loading, error } = useAuth();
  const { token } = useParams();
  const navigate = useNavigate();

  const validateStrength = (pwd) => {
    const checks = {
      length: pwd.length >= 8,
      letter: /[A-Za-z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd)
    };

    setValidationChecks(checks);

    const score = Object.values(checks).filter(Boolean).length;
    const strengthPercentage = (score / 4) * 100;

    setStrength(strengthPercentage);
    setStrengthLabel(
      strengthPercentage >= 100 ? 'Muy Fuerte' :
        strengthPercentage >= 75 ? 'Fuerte' :
          strengthPercentage >= 50 ? 'Media' :
            strengthPercentage >= 25 ? 'Débil' : 'Muy Débil'
    );
  };

  const getStrengthColor = (strength) => {
    if (strength >= 100) return 'bg-gradient-to-r from-green-500 to-emerald-500';
    if (strength >= 75) return 'bg-gradient-to-r from-green-400 to-teal-500';
    if (strength >= 50) return 'bg-gradient-to-r from-yellow-400 to-orange-500';
    if (strength >= 25) return 'bg-gradient-to-r from-orange-400 to-red-500';
    return 'bg-gradient-to-r from-red-400 to-red-600';
  };

  const isPasswordValid = () =>
    Object.values(validationChecks).every(Boolean);

  const handleChange = async (e) => {
    e.preventDefault();

    if (!isPasswordValid()) {
      return Swal.fire({
        icon: 'warning',
        title: 'Contraseña inválida',
        text: 'La contraseña debe cumplir con todos los requisitos de seguridad.',
        confirmButtonText: 'Aceptar',
      });
    }

    try {
      await newPassword(token, password);
      Swal.fire({
        icon: 'success',
        title: 'Contraseña Restablecida',
        text: 'Tu contraseña ha sido restablecida con éxito.',
        confirmButtonText: 'Aceptar',
      });

      setPassword('');
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo restablecer la contraseña.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-blue-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-800 dark:to-blue-800 p-8 text-white">
          <h2 className="text-3xl font-bold text-center">
            Nueva Contraseña
          </h2>
          <p className="text-sm text-blue-100 text-center mt-2">
            Crea una contraseña segura para tu cuenta
          </p>
        </div>

        {/* Form section */}
        <div className="p-8">
          <form onSubmit={handleChange} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nueva Contraseña
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 text-gray-400 dark:text-gray-300" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validateStrength(e.target.value);
                  }}
                  placeholder="********"
                  className="pl-10 pr-12 py-2.5 w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>

              {/* Password strength indicator */}
              <div className="mt-4 space-y-3">
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${getStrengthColor(strength)}`}
                    style={{ width: `${strength}%` }}
                  />
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Fuerza: {strengthLabel}
                </p>

                {/* Validation checks */}
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    {validationChecks.length ? (
                      <CheckCircle2Icon className="text-green-500" size={18} />
                    ) : (
                      <AlertCircleIcon className="text-gray-400" size={18} />
                    )}
                    <span className={validationChecks.length ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                      Mínimo 8 caracteres
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {validationChecks.letter ? (
                      <CheckCircle2Icon className="text-green-500" size={18} />
                    ) : (
                      <AlertCircleIcon className="text-gray-400" size={18} />
                    )}
                    <span className={validationChecks.letter ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                      Al menos una letra
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {validationChecks.number ? (
                      <CheckCircle2Icon className="text-green-500" size={18} />
                    ) : (
                      <AlertCircleIcon className="text-gray-400" size={18} />
                    )}
                    <span className={validationChecks.number ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                      Al menos un número
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {validationChecks.special ? (
                      <CheckCircle2Icon className="text-green-500" size={18} />
                    ) : (
                      <AlertCircleIcon className="text-gray-400" size={18} />
                    )}
                    <span className={validationChecks.special ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                      Al menos un carácter especial
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm font-medium text-center bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-600 rounded-lg px-4 py-2.5 shadow-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !isPasswordValid()}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                  </svg>
                  Procesando...
                </>
              ) : (
                'Restablecer Contraseña'
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-300"
            >
              <ArrowLeftIcon className="text-lg" />
              Volver al inicio de sesión
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
