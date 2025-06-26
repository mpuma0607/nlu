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

-- Create AI response cache table for reusable responses
CREATE TABLE IF NOT EXISTS ai_response_cache (
  id SERIAL PRIMARY KEY,
  cache_key VARCHAR(500) UNIQUE NOT NULL,
  tool_type VARCHAR(100) NOT NULL,
  input_hash VARCHAR(64) NOT NULL,
  response_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '30 days')
);

-- Create indexes for cache table
CREATE INDEX IF NOT EXISTS idx_ai_cache_key ON ai_response_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_ai_cache_tool_type ON ai_response_cache(tool_type);
CREATE INDEX IF NOT EXISTS idx_ai_cache_expires_at ON ai_response_cache(expires_at);

-- Create cleanup function for expired creations (6 months)
CREATE OR REPLACE FUNCTION cleanup_expired_creations() RETURNS void AS $$
BEGIN
  DELETE FROM user_creations 
  WHERE expires_at < CURRENT_TIMESTAMP;
  
  DELETE FROM ai_response_cache 
  WHERE expires_at < CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_creations_updated_at
    BEFORE UPDATE ON user_creations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
