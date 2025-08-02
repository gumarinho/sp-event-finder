# O que fazer em SP - MVP

Um aplicativo web responsivo para descobrir eventos em São Paulo, com funcionalidades de busca, filtros, favoritos e compartilhamento.

## 🚀 Funcionalidades

- **Lista de eventos** com informações essenciais (título, data, local, imagem)
- **Busca por nome** de evento, descrição ou local
- **Filtro "somente gratuitos"** para encontrar eventos sem custo
- **Tela de detalhes** completa com todas as informações do evento
- **Sistema de favoritos** com persistência local
- **Compartilhamento de eventos** via Web Share API ou clipboard
- **Estados de loading e erro** com feedback visual
- **Design responsivo** otimizado para mobile
- **Arquitetura modular** para trocar fontes de dados facilmente

## 🛠️ Tecnologias

- **React 18** + **TypeScript**
- **Vite** para build e desenvolvimento
- **Tailwind CSS** + **shadcn/ui** para interface
- **React Router** para navegação
- **Lucide React** para ícones

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/                 # Componentes base do shadcn/ui
│   ├── EventCard.tsx       # Card de evento reutilizável
│   ├── EventFilters.tsx    # Componente de filtros
│   └── LoadingSpinner.tsx  # Spinner de carregamento
├── pages/
│   ├── Index.tsx          # Página principal (lista)
│   ├── EventDetails.tsx   # Página de detalhes
│   └── NotFound.tsx       # Página 404
├── services/
│   ├── mockEvents.ts      # Dados mock e serviço mock
│   └── eventService.ts    # Serviço principal (mock + Eventbrite)
├── types/
│   └── event.ts          # Interfaces TypeScript
├── utils/
│   ├── storage.ts        # Utilitários de persistência local
│   └── sharing.ts        # Utilitários de compartilhamento
└── App.tsx               # App principal com roteamento
```

## 🚀 Como executar

### Pré-requisitos
- Node.js 18+ e npm

### Instalação e execução
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## ⚙️ Configuração

### Usando dados mock (padrão)
O app vem configurado com dados mock por padrão. Não é necessária nenhuma configuração adicional.

### Configurando integração com Eventbrite

1. **Alterar configuração no código:**
   ```typescript
   // Em src/services/eventService.ts
   const USE_MOCK = false; // Alterar para false
   ```

2. **Obter credenciais do Eventbrite:**
   - Acesse [Eventbrite Developers](https://www.eventbrite.com/platform/api)
   - Crie um app e obtenha o token OAuth
   - Encontre o ID da sua organização

3. **Configurar no localStorage (interface web):**
   ```javascript
   // No console do navegador
   localStorage.setItem('eventbrite_token', 'SEU_TOKEN_AQUI');
   localStorage.setItem('eventbrite_org_id', 'SEU_ORG_ID_AQUI');
   ```

4. **Para facilitar, adicione uma tela de configuração:**
   ```typescript
   import { configureEventbrite } from '@/services/eventService';
   
   // Exemplo de uso
   configureEventbrite('seu_token', 'seu_org_id');
   ```

## 📱 Convertendo para App Móvel com Capacitor

Para converter este projeto em um app móvel nativo:

1. **Instalar Capacitor:**
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
   ```

2. **Inicializar Capacitor:**
   ```bash
   npx cap init
   ```

3. **Fazer build do projeto:**
   ```bash
   npm run build
   ```

4. **Adicionar plataformas:**
   ```bash
   npx cap add ios
   npx cap add android
   ```

5. **Sincronizar e executar:**
   ```bash
   npx cap sync
   npx cap run ios    # Para iOS (requer Xcode)
   npx cap run android # Para Android (requer Android Studio)
   ```

## 🔧 Próximos Incrementos

### Funcionalidades Essenciais
- [ ] **Notificações push** para eventos favoritos
- [ ] **Filtros avançados** (categoria, data, preço, localização)
- [ ] **Mapa de eventos** com geolocalização
- [ ] **Sincronização com calendário** do dispositivo
- [ ] **Avaliações e comentários** de eventos

### Melhorias de UX
- [ ] **Modo offline** com cache de eventos
- [ ] **Busca por voz** usando Web Speech API
- [ ] **Tema escuro/claro** automático
- [ ] **Onboarding** para novos usuários
- [ ] **Animações** e transições mais elaboradas

### Integrações Externas
- [ ] **Login social** (Google, Facebook)
- [ ] **API do Google Maps** para navegação
- [ ] **APIs de transporte público** (SPTrans)
- [ ] **Integração com redes sociais** para publicar presença
- [ ] **APIs de clima** para informações contextuais

### Backend e Analytics
- [ ] **Backend próprio** com banco de dados
- [ ] **Analytics de uso** e eventos populares
- [ ] **Sistema de recomendações** baseado em histórico
- [ ] **API própria** para criação de eventos
- [ ] **Dashboard administrativo** para organizadores

### Monetização
- [ ] **Eventos patrocinados** com destaque
- [ ] **Sistema de ingressos** integrado
- [ ] **Cupons de desconto** para estabelecimentos parceiros
- [ ] **Programa de pontos** para usuários frequentes

## 🐛 Debugging e Logs

O projeto inclui logs detalhados no console para facilitar o debug:
- Erros de carregamento de eventos
- Operações de favoritos
- Tentativas de compartilhamento
- Navegação entre telas

## 📄 Licença

Este projeto foi criado como MVP e pode ser usado livremente para fins educacionais e comerciais.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ para a comunidade paulistana** 🏙️