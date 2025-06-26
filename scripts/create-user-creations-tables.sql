-- Create user creations table
CREATE TABLE IF NOT EXISTS user_creations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  tool_type VARCHAR(100) NOT NULL,
  title VARCHAR(500),
  content TEXT NOT NULL,
  form_data JSONB,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '6 months')
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_creations_user_id ON user_creations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_creations_user_email ON user_creations(user_email);
CREATE INDEX IF NOT EXISTS idx_user_creations_tool_type ON user_creations(tool_type);
CREATE INDEX IF NOT EXISTS idx_user_creations_created_at ON user_creations(created_at);
CREATE INDEX IF NOT EXISTS idx_user_creations_expires_at ON user_creations(expires_at);

-- Create user creation cache table for AI responses
CREATE TABLE IF NOT EXISTS creation_cache (
  id SERIAL PRIMARY KEY,
  cache_key VARCHAR(500) UNIQUE NOT NULL,
  tool_type VARCHAR(100) NOT NULL,
  input_hash VARCHAR(255) NOT NULL,
  response_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days')
);

-- Create indexes for cache table
CREATE INDEX IF NOT EXISTS idx_creation_cache_key ON creation_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_creation_cache_tool_type ON creation_cache(tool_type);
CREATE INDEX IF NOT EXISTS idx_creation_cache_input_hash ON creation_cache(input_hash);
CREATE INDEX IF NOT EXISTS idx_creation_cache_expires_at ON creation_cache(expires_at);
