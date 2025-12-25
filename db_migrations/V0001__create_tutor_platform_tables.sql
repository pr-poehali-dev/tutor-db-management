-- Создание таблицы Заказчик (ученики)
CREATE TABLE IF NOT EXISTS zakazchik (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avatar_url TEXT,
    about TEXT
);

-- Создание таблицы Исполнитель (репетиторы)
CREATE TABLE IF NOT EXISTS ispolnitel (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(100) NOT NULL,
    experience_years INTEGER DEFAULT 0,
    price_per_hour DECIMAL(10, 2) NOT NULL,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    reviews_count INTEGER DEFAULT 0,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    avatar_url TEXT,
    description TEXT,
    achievements TEXT[],
    schedule JSONB,
    is_verified BOOLEAN DEFAULT FALSE
);

-- Создание таблицы Заказ
CREATE TABLE IF NOT EXISTS zakaz (
    id SERIAL PRIMARY KEY,
    zakazchik_id INTEGER NOT NULL REFERENCES zakazchik(id),
    ispolnitel_id INTEGER NOT NULL REFERENCES ispolnitel(id),
    subject VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    total_price DECIMAL(10, 2),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Создание таблицы Занятие
CREATE TABLE IF NOT EXISTS zanyatie (
    id SERIAL PRIMARY KEY,
    zakaz_id INTEGER NOT NULL REFERENCES zakaz(id),
    scheduled_date TIMESTAMP NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'in_progress')),
    meeting_link TEXT,
    homework TEXT,
    notes TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы Автор_отзыва
CREATE TABLE IF NOT EXISTS avtor_otzyva (
    id SERIAL PRIMARY KEY,
    zakazchik_id INTEGER NOT NULL REFERENCES zakazchik(id),
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы Отзыв
CREATE TABLE IF NOT EXISTS otzyv (
    id SERIAL PRIMARY KEY,
    avtor_id INTEGER NOT NULL REFERENCES avtor_otzyva(id),
    ispolnitel_id INTEGER NOT NULL REFERENCES ispolnitel(id),
    zakaz_id INTEGER REFERENCES zakaz(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE
);

-- Создание индексов для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_zakaz_zakazchik ON zakaz(zakazchik_id);
CREATE INDEX IF NOT EXISTS idx_zakaz_ispolnitel ON zakaz(ispolnitel_id);
CREATE INDEX IF NOT EXISTS idx_zanyatie_zakaz ON zanyatie(zakaz_id);
CREATE INDEX IF NOT EXISTS idx_otzyv_ispolnitel ON otzyv(ispolnitel_id);
CREATE INDEX IF NOT EXISTS idx_otzyv_avtor ON otzyv(avtor_id);
CREATE INDEX IF NOT EXISTS idx_ispolnitel_subject ON ispolnitel(subject);
CREATE INDEX IF NOT EXISTS idx_ispolnitel_rating ON ispolnitel(rating DESC);
