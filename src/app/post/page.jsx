"use client"
import { useState } from 'react';
import axios from 'axios';
import styles from './post.module.css';

export default function Post() {
    const [loading, setLoading] = useState(false);
    const [addedComment, setAddedComment] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', comment: '' });

    const [error, setError] = useState(false);

    const CriarNovoComentario = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/comments", {
                name: form.name.trim(),
                email: form.email.trim(),
                body: form.comment.trim(),
            });
            setAddedComment([...addedComment, response.data]);
            setForm({ name: '', email: '', comment: '' });
        } catch (error) {
            setError(true);
            console.error("erro ao criar comentário", error);
        } finally {
            setLoading(false);
        }
    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Criar Comentário</h1>
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

                        <button 
                            type="button"
                            onClick={CriarNovoComentario} 
                            disabled={!form.name.trim() || loading}
                            className={styles.button}
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
                                        <div className={styles.commentId}>ID: {comment.id}</div>
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
