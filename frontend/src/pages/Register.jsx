import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        }
    };

    return (
        <div className="container mt-5 animate-fade-in">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Register</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Register</button>
                            </form>
                            <div className="mt-3 text-center">
                                Already have an account? <Link to="/login">Login here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
