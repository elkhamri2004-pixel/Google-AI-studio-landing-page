import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Clock, 
  Send, 
  Download, 
  ExternalLink,
  ChevronRight,
  LogOut,
  User as UserIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  orderBy,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// --- Types ---
interface Project {
  id: string;
  title: string;
  status: 'planning' | 'design' | 'development' | 'testing' | 'completed';
  progress: number;
  description: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: any;
}

interface Asset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'link' | 'archive';
  createdAt: any;
}

// --- Components ---

export const ClientDashboard = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [view, setView] = useState<'overview' | 'project'>('overview');

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Ensure user document exists
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            role: 'client',
            createdAt: serverTimestamp()
          });
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Projects Listener
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'projects'), where('clientId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(projs);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'projects'));
    return unsubscribe;
  }, [user]);

  // Active Project Listeners (Messages & Assets)
  useEffect(() => {
    if (!activeProject) return;

    const msgQ = query(
      collection(db, `projects/${activeProject.id}/messages`), 
      orderBy('createdAt', 'asc')
    );
    const msgUnsub = onSnapshot(msgQ, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message)));
    });

    const assetQ = query(
      collection(db, `projects/${activeProject.id}/assets`), 
      orderBy('createdAt', 'desc')
    );
    const assetUnsub = onSnapshot(assetQ, (snapshot) => {
      setAssets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Asset)));
    });

    return () => {
      msgUnsub();
      assetUnsub();
    };
  }, [activeProject]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeProject || !user) return;

    try {
      await addDoc(collection(db, `projects/${activeProject.id}/messages`), {
        projectId: activeProject.id,
        senderId: user.uid,
        senderName: user.displayName || 'Client',
        content: newMessage,
        createdAt: serverTimestamp()
      });
      setNewMessage('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'messages');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-xl text-center"
      >
        <div className="w-20 h-20 bg-brand-light/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <UserIcon className="w-10 h-10 text-brand-primary" />
        </div>
        <h2 className="text-3xl font-bold text-brand-dark mb-4">Client Portal</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Log in to view your project progress, chat with our design team, and access your project assets.
        </p>
        <button 
          onClick={handleLogin}
          className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-lg hover:shadow-brand-primary/20"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />
          Continue with Google
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-gray-100 flex flex-col transition-all">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl">NS</span>
          </div>
          <span className="font-bold text-brand-dark hidden lg:block">NovaSite Portal</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setView('overview')}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${view === 'overview' ? 'bg-brand-light/50 text-brand-primary font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="hidden lg:block">Overview</span>
          </button>
          
          <div className="pt-4 pb-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-widest hidden lg:block">
            Active Projects
          </div>
          {projects.map(proj => (
            <button 
              key={proj.id}
              onClick={() => {
                setActiveProject(proj);
                setView('project');
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeProject?.id === proj.id && view === 'project' ? 'bg-brand-light/50 text-brand-primary font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <div className={`w-2 h-2 rounded-full ${
                proj.status === 'planning' ? 'bg-blue-500' :
                proj.status === 'design' ? 'bg-purple-500' :
                proj.status === 'development' ? 'bg-orange-500' :
                proj.status === 'testing' ? 'bg-yellow-500' :
                proj.status === 'completed' ? 'bg-green-500' :
                'bg-gray-300'
              }`}></div>
              <span className="hidden lg:block truncate">{proj.title}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <div className="flex items-center gap-3 p-3 mb-4 hidden lg:flex">
            <img src={user.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-gray-100" />
            <div className="flex-1 truncate">
              <p className="text-sm font-bold text-brand-dark truncate">{user.displayName}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto p-6 lg:p-10">
          {view === 'overview' ? (
            <div className="space-y-10">
              <header>
                <h1 className="text-3xl font-bold text-brand-dark mb-2">Welcome back, {user.displayName?.split(' ')[0]}!</h1>
                <p className="text-gray-500">Here's what's happening with your projects.</p>
              </header>

              {projects.length === 0 ? (
                <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">No active projects yet</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Once we start your project, you'll see progress tracking and assets here.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map(proj => (
                    <motion.button
                      key={proj.id}
                      whileHover={{ y: -5 }}
                      onClick={() => {
                        setActiveProject(proj);
                        setView('project');
                      }}
                      className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm text-left group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                          proj.status === 'planning' ? 'bg-blue-100 text-blue-700' :
                          proj.status === 'design' ? 'bg-purple-100 text-purple-700' :
                          proj.status === 'development' ? 'bg-orange-100 text-orange-700' :
                          proj.status === 'testing' ? 'bg-yellow-100 text-yellow-700' :
                          proj.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {proj.status}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-primary transition-colors" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-dark mb-4">{proj.title}</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm font-bold">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-brand-primary">{proj.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${proj.progress}%` }}
                            className="h-full bg-brand-primary"
                          />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          ) : activeProject ? (
            <div className="space-y-8">
              <button 
                onClick={() => setView('overview')}
                className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-2"
              >
                ← Back to Overview
              </button>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Project Details & Assets */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                      <div>
                        <h1 className="text-3xl font-bold text-brand-dark mb-2">{activeProject.title}</h1>
                        <p className="text-gray-500">{activeProject.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-xl font-bold text-brand-primary capitalize">{activeProject.status}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-10">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gray-400">Overall Completion</span>
                        <span className="text-brand-primary">{activeProject.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${activeProject.progress}%` }}
                          className="h-full bg-brand-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Planning', 'Design', 'Dev', 'Testing'].map((step, i) => {
                        const steps = ['planning', 'design', 'development', 'testing', 'completed'];
                        const currentIdx = steps.indexOf(activeProject.status);
                        const isDone = currentIdx > i || activeProject.status === 'completed';
                        const isCurrent = currentIdx === i;

                        return (
                          <div key={step} className="text-center">
                            <div className={`w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center border-2 transition-all ${
                              isDone ? 'bg-green-500 border-green-500 text-white' : 
                              isCurrent ? 'border-brand-primary text-brand-primary animate-pulse' : 
                              'border-gray-100 text-gray-300'
                            }`}>
                              {isDone ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{i + 1}</span>}
                            </div>
                            <p className={`text-xs font-bold uppercase tracking-widest ${isDone || isCurrent ? 'text-brand-dark' : 'text-gray-300'}`}>
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Assets */}
                  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-brand-dark">Project Assets</h2>
                      <FileText className="w-6 h-6 text-gray-300" />
                    </div>

                    {assets.length === 0 ? (
                      <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                        <p className="text-gray-400">No assets uploaded yet.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {assets.map(asset => (
                          <a 
                            key={asset.id}
                            href={asset.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 hover:border-brand-primary hover:bg-brand-light/20 transition-all group"
                          >
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                              {asset.type === 'image' ? <Download className="w-6 h-6 text-brand-primary" /> : <ExternalLink className="w-6 h-6 text-brand-primary" />}
                            </div>
                            <div className="flex-1 truncate">
                              <p className="font-bold text-brand-dark truncate">{asset.name}</p>
                              <p className="text-xs text-gray-400 uppercase">{asset.type}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Chat */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-[600px] lg:h-auto">
                  <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="font-bold text-brand-dark flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-brand-primary" />
                      Project Chat
                    </h2>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <AlertCircle className="w-8 h-8 text-gray-200 mb-2" />
                        <p className="text-sm text-gray-400">Start a conversation about your project.</p>
                      </div>
                    ) : (
                      messages.map(msg => (
                        <div key={msg.id} className={`flex flex-col ${msg.senderId === user.uid ? 'items-end' : 'items-start'}`}>
                          <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                            msg.senderId === user.uid 
                              ? 'bg-brand-primary text-white rounded-tr-none' 
                              : 'bg-gray-100 text-gray-700 rounded-tl-none'
                          }`}>
                            <p className="font-bold text-[10px] uppercase tracking-widest mb-1 opacity-70">
                              {msg.senderId === user.uid ? 'You' : msg.senderName}
                            </p>
                            {msg.content}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={sendMessage} className="p-4 border-t border-gray-50">
                    <div className="relative">
                      <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="w-full pl-4 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-brand-primary outline-none transition-all"
                      />
                      <button 
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-primary text-white rounded-lg flex items-center justify-center hover:bg-brand-dark transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};
