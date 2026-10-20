import React, { useState } from 'react';
import { 
  X, 
  User as UserIcon, 
  Lock, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Award, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Fingerprint
} from 'lucide-react';
import { User, UserProfile } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onLoginSuccess
}) => {
  const [tab, setTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  
  // Registration State
  const [role, setRole] = useState<UserProfile>('TURISTA');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cadasturNum, setCadasturNum] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communityCnpj, setCommunityCnpj] = useState('');
  const [pixKey, setPixKey] = useState('');

  // Demo accounts for instant 1-click test
  const demoAccounts: { label: string; user: User; desc: string }[] = [
    {
      label: 'Mariana Vasconcelos',
      desc: 'Turista Consciente (São Paulo)',
      user: {
        id: 'usr-tourist-mariana',
        name: 'Mariana Vasconcelos',
        email: 'mariana.vasconcelos@ecotur.com.br',
        role: 'TURISTA',
        phone: '(11) 98712-4091',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        createdAt: '2026-09-10'
      }
    },
    {
      label: 'Moacir Karipuna Guaporé',
      desc: 'Guia Cadastur RO-26.0084/2024 (Costa Marques)',
      user: {
        id: 'usr-guide-moacir',
        name: 'Moacir Karipuna Guaporé',
        email: 'moacir.guia@rondonianativa.org.br',
        role: 'GUIA',
        cadasturNum: 'RO-26.0084/2024-TUR',
        cadasturStatus: 'ATIVO',
        specialties: ['Navegação Fluvial', 'Etno-história do Guaporé'],
        phone: '(69) 99312-4411',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        createdAt: '2026-08-01'
      }
    },
    {
      label: 'Dona Benvinda dos Santos',
      desc: 'Liderança Quilombola (Pedras Negras)',
      user: {
        id: 'usr-lead-benvinda',
        name: 'Dona Benvinda dos Santos Quilombola',
        email: 'pedrasnegras.guapore@gmail.com',
        role: 'LIDERANCA',
        communityName: 'Associação Comunitária Quilombola de Pedras Negras',
        communityCnpj: '08.942.311/0001-89',
        pixKey: 'quilombo.pedrasnegras@rondonianativa.org.br',
        phone: '(69) 99220-7714',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
        createdAt: '2026-07-15'
      }
    },
    {
      label: 'Eduardo Renan Souza de Aquino',
      desc: 'Proponente Centelha 3 & Admin Geral',
      user: {
        id: 'usr-admin-eduardo',
        name: 'Eduardo Renan Souza de Aquino',
        email: 'innot.renan@gmail.com',
        role: 'ADMIN',
        phone: '(69) 99988-7766',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        createdAt: '2026-06-01'
      }
    }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      phone,
      cpf,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      cadasturNum: role === 'GUIA' ? cadasturNum : undefined,
      cadasturStatus: role === 'GUIA' ? 'ATIVO' : undefined,
      communityName: role === 'LIDERANCA' ? communityName : undefined,
      communityCnpj: role === 'LIDERANCA' ? communityCnpj : undefined,
      pixKey: role === 'LIDERANCA' ? pixKey : undefined,
      createdAt: new Date().toISOString()
    };

    onLoginSuccess(newUser);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Default tourist if not found in presets
    const fallbackUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'TURISTA',
      phone: '(69) 99999-0000',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString()
    };

    onLoginSuccess(fallbackUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-forest-900 text-white">
          <div className="flex items-center space-x-2">
            <Fingerprint className="w-5 h-5 text-emerald-300" />
            <h3 className="font-heading font-bold text-base text-white">
              Identificação & Acesso — Rondônia Nativa
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-forest-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-bold">
          <button
            onClick={() => setTab('LOGIN')}
            className={`py-2 rounded-xl transition-all ${
              tab === 'LOGIN' ? 'bg-white text-forest-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Acessar Minha Conta
          </button>
          <button
            onClick={() => setTab('REGISTER')}
            className={`py-2 rounded-xl transition-all ${
              tab === 'REGISTER' ? 'bg-white text-forest-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Cadastrar Novo Usuário
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* TAB 1: LOGIN */}
          {tab === 'LOGIN' && (
            <div className="space-y-5">
              
              {/* Quick 1-Click Login Simulator */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Acesso Rápido Simulado (Perfis Reais de Rondônia):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {demoAccounts.map((acc, idx) => (
                    <button
                      key={idx}
                      onClick={() => onLoginSuccess(acc.user)}
                      className="p-3 rounded-2xl border border-slate-200 hover:border-forest-600 hover:bg-forest-50/60 text-left transition-all group flex items-center space-x-3"
                    >
                      <img
                        src={acc.user.avatarUrl}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-xs text-slate-900 block truncate group-hover:text-forest-800">
                          {acc.label}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {acc.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-slate-400">Ou entre com seus dados</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Manual Form */}
              <form onSubmit={handleManualLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail Cadastrado</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Senha de Acesso</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-md mt-2"
                >
                  Entrar no Sistema
                </button>
              </form>

            </div>
          )}

          {/* TAB 2: REGISTER */}
          {tab === 'REGISTER' && (
            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Role Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Qual é o seu perfil de atuação?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'TURISTA', label: 'Turista Consciente', icon: UserIcon },
                    { id: 'GUIA', label: 'Guia Cadastur', icon: Award },
                    { id: 'LIDERANCA', label: 'Liderança TBC', icon: Building2 }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setRole(item.id as UserProfile)}
                        className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold flex flex-col items-center justify-center space-y-1 ${
                          role === item.id 
                            ? 'bg-forest-800 text-white border-forest-800 shadow-sm' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* General Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="(69) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">CPF</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-forest-600"
                  />
                </div>
              </div>

              {/* Guia Specific Fields (RF01) */}
              {role === 'GUIA' && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dados de Habilitação Cadastur (SETUR-RO / Ministério do Turismo)</span>
                  </span>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Número do Registro Cadastur (Obrigatório pela RN01)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: RO-26.0084/2024-TUR"
                      value={cadasturNum}
                      onChange={(e) => setCadasturNum(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-amber-300 bg-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <p className="text-[11px] text-amber-800">
                    O número será consultado na base do Ministério do Turismo para validação prévia.
                  </p>
                </div>
              )}

              {/* Liderança Specific Fields (RF06) */}
              {role === 'LIDERANCA' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-900 block flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dados da Associação Comunitária & Subconta Pix (Social Split)</span>
                  </span>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">Nome da Associação / Comunidade</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Associação Quilombola de Pedras Negras"
                      value={communityName}
                      onChange={(e) => setCommunityName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white focus:ring-2 focus:ring-forest-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">CNPJ Jurídico</label>
                      <input
                        type="text"
                        required
                        placeholder="00.000.000/0001-00"
                        value={communityCnpj}
                        onChange={(e) => setCommunityCnpj(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-emerald-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">Chave PIX Oficial (Repasse)</label>
                      <input
                        type="text"
                        required
                        placeholder="Chave Pix da Associação"
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-emerald-300 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Concluir Cadastro & Conectar
              </button>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e normativas da SETUR-RO.
        </div>

      </div>
    </div>
  );
};
