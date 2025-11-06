-- Performance optimization indexes for Triopia email platform

-- Email accounts indexes
CREATE INDEX IF NOT EXISTS idx_email_accounts_user_id ON email_accounts(userId);
CREATE INDEX IF NOT EXISTS idx_email_accounts_provider ON email_accounts(provider);
CREATE INDEX IF NOT EXISTS idx_email_accounts_email ON email_accounts(email);

-- Emails indexes
CREATE INDEX IF NOT EXISTS idx_emails_account_id ON emails(accountId);
CREATE INDEX IF NOT EXISTS idx_emails_folder ON emails(folder);
CREATE INDEX IF NOT EXISTS idx_emails_is_read ON emails(isRead);
CREATE INDEX IF NOT EXISTS idx_emails_is_starred ON emails(isStarred);
CREATE INDEX IF NOT EXISTS idx_emails_received_at ON emails(receivedAt DESC);
CREATE INDEX IF NOT EXISTS idx_emails_from ON emails(`from`);
CREATE INDEX IF NOT EXISTS idx_emails_subject ON emails(subject);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_emails_account_folder ON emails(accountId, folder);
CREATE INDEX IF NOT EXISTS idx_emails_account_read ON emails(accountId, isRead);
CREATE INDEX IF NOT EXISTS idx_emails_account_received ON emails(accountId, receivedAt DESC);

-- Full-text search index for email content
CREATE FULLTEXT INDEX IF NOT EXISTS idx_emails_fulltext ON emails(subject, body, `from`, fromName);

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_open_id ON users(openId);
