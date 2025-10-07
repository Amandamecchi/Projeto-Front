"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './post.module.css';

export default function Post() {
    const [loading, setLoading] = useState(false);
    const [addedComment, setAddedComment] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', comment: '' });
    const [error, setError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedComments = sessionStorage.getItem('comments');
        if (savedComments) {
            try {
                setAddedComment(JSON.parse(savedComments));
            } catch (error) {
                console.error('Erro ao carregar comentários do sessionStorage:', error);
                sessionStorage.removeItem('comments');
            }
        }

        const savedForm = sessionStorage.getItem('formData');
        if (savedForm) {
            try {
                setForm(JSON.parse(savedForm));
            } catch (error) {
                console.error('Erro ao carregar dados do formulário:', error);
                sessionStorage.removeItem('formData');
            }
        }
    }, []);

    useEffect(() => {
        if (addedComment.length > 0) {
            sessionStorage.setItem('comments', JSON.stringify(addedComment));
        } else {
            sessionStorage.removeItem('comments');
        }
    }, [addedComment]);

    useEffect(() => {
        sessionStorage.setItem('formData', JSON.stringify(form));
    }, [form]);

    const CriarNovoComentario = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/comments", {
                name: form.name.trim(),
                email: form.email.trim(),
                body: form.comment.trim(),
            });
            
            const newComments = [...addedComment, response.data];
            setAddedComment(newComments);
            
            const clearedForm = { name: '', email: '', comment: '' };
            setForm(clearedForm);
            sessionStorage.setItem('formData', JSON.stringify(clearedForm));
            
        } catch (error) {
            setError(true);
            console.error("erro ao criar comentário", error);
        } finally {
            setLoading(false);
        }
    };

    const deletarComentario = (commentId) => {
        const updatedComments = addedComment.filter(comment => comment.id !== commentId);
        setAddedComment(updatedComments);
        
        if (updatedComments.length === 0) {
            sessionStorage.removeItem('comments');
        } else {
            sessionStorage.setItem('comments', JSON.stringify(updatedComments));
        }
    };

    const voltarParaHome = () => {
        router.push('/');
    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const limparDados = () => {
        setAddedComment([]);
        setForm({ name: '', email: '', comment: '' });
        sessionStorage.removeItem('comments');
        sessionStorage.removeItem('formData');
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Criar Comentário</h1>
                    <button 
                        onClick={voltarParaHome}
                        className={`${styles.backButton} ${styles.styledButton}`}
                    >
                        🏠 Voltar para Home
                    </button>
                </div>

                <div className={styles.formSection}>
                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Nome *</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={atualizarForm}
                                placeholder="Digite seu nome"
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={atualizarForm}
                                placeholder="Digite seu email"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Comentário</label>
                            <textarea
                                name="comment"
                                value={form.comment}
                                onChange={atualizarForm}
                                placeholder="Digite seu comentário"
                                className={styles.textarea}
                            />
                        </div>

                        <div className={styles.buttonGroup}>
                            <button 
                                type="button"
                                onClick={CriarNovoComentario} 
                                disabled={!form.name.trim() || loading}
                                className={`${styles.button} ${styles.styledButton}`}
                            >
                                {loading ? (
                                    <span className={styles.loading}>
                                        <span className={styles.spinner}></span>
                                        Enviando...
                                    </span>
                                ) : (
                                    'Enviar Comentário'
                                )}
                            </button>

                            {addedComment.length > 0 && (
                                <button 
                                    type="button"
                                    onClick={limparDados}
                                    className={`${styles.clearButton} ${styles.styledButton}`}
                                >
                                    Limpar Todos
                                </button>
                            )}
                        </div>
                    </form>

                    {error && (
                        <div className={styles.error}>
                            ❌ Erro ao criar comentário. Tente novamente.
                        </div>
                    )}
                </div>

                <div className={styles.commentsSection}>
                    <h2 className={styles.commentsTitle}>
                        Comentários Criados 
                        <span className={styles.badge}>{addedComment.length}</span>
                    </h2>

                    {addedComment.length === 0 ? (
                        <div className={styles.emptyState}>
                            Nenhum comentário criado ainda. Seja o primeiro! 💭
                        </div>
                    ) : (
                        <div className={styles.commentsList}>
                            {addedComment.map((comment, index) => (
                                <div key={comment.id || index} className={styles.commentCard}>
                                    <div className={styles.commentHeader}>
                                        <div className={styles.commentName}>{comment.name}</div>
                                        <div className={styles.commentActions}>
                                            <div className={styles.commentId}>ID: {comment.id}</div>
                                            <button 
                                                onClick={() => deletarComentario(comment.id)}
                                                className={`${styles.deleteButton} ${styles.styledButton}`}
                                                title="Deletar comentário"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.commentEmail}>{comment.email}</div>
                                    <div className={styles.commentBody}>{comment.body}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
