DROP TYPE IF EXISTS "urgency_options";
CREATE TYPE "urgency_options" AS ENUM (
  'high',
  'medium',
  'low'
);


-----------------------------------------------------------------------------------------------
-- ORDER
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "order" CASCADE;
CREATE TABLE "order" (
    "order_id"          INTEGER generated ALWAYS as IDENTITY PRIMARY KEY,
    "client_fk"         INTEGER         NOT NULL,
    "patient_fk"        INTEGER         NOT NULL,
    "company_fk"        INTEGER         NOT NULL,
    "treatment_fk"      INTEGER         NOT NULL,
    "frequency"         SMALLINT        NOT NULL,
    "diagnosis"         TEXT,
    "updated_by"        INTEGER         NOT NULL,
    "deleted_at"        TIMESTAMP,
    "created_at"        TIMESTAMP 	  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "updated_at"        TIMESTAMP 	  NOT NULL  DEFAULT CURRENT_TIMESTAMP,

    CHECK (frequency BETWEEN 1 AND 7)
);


-----------------------------------------------------------------------------------------------
-- ORDER_DETAIL
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "order_detail" CASCADE;
CREATE TABLE "order_detail" (
    "detail_id"         INTEGER generated ALWAYS as IDENTITY PRIMARY KEY,
    "order_fk"          INTEGER REFERENCES "order"(order_id),
    "client_fk"         INTEGER         NOT NULL,
    "professional_fk" 	INTEGER,
    "start_date"        TIMESTAMP       NOT NULL,
    "finish_date"       TIMESTAMP       NOT NULL,
    "total_sessions"    SMALLINT        NOT NULL,
    "sessions"          SMALLINT        NOT NULL,
    "coinsurance"       DECIMAL(7,2)    NOT NULL  DEFAULT 0,
    "value"             DECIMAL(7,2)    NOT NULL,
    "cost"              DECIMAL(7,2)    NOT NULL,
    "started_at"        DATE,
    "finished_at"       DATE,
    "requirements"      VARCHAR(300),
    "updated_by"        INTEGER       NOT NULL,
    "created_at"        TIMESTAMP 	  NOT NULL  DEFAULT CURRENT_TIMESTAMP,
    "updated_at"        TIMESTAMP 	  NOT NULL  DEFAULT CURRENT_TIMESTAMP,

    -- Validacion de "start_date" y "finish_date", intervalo 1 year
    CHECK (start_date >= CURRENT_DATE - INTERVAL '1 year' AND start_date <= CURRENT_DATE + INTERVAL '1 year'),
    CHECK (finish_date >= CURRENT_DATE - INTERVAL '1 year' AND finish_date <= CURRENT_DATE + INTERVAL '1 year'),

    -- verificar si ambas fechas pertenecen al mismo mes y que la fecha de inicio no sea mas reciente que la de fin
    CHECK (start_date <= finish_date 
    AND
        EXTRACT(MONTH FROM start_date) = EXTRACT(MONTH FROM finish_date) 
    AND
        EXTRACT(YEAR FROM start_date) = EXTRACT(YEAR FROM finish_date)
    ),

    CHECK (total_sessions 	>= 0 AND total_sessions <= 31),
    CHECK (coinsurance 		>= 0),
    CHECK ("value" 	>= 0),
    CHECK (cost 	>= 0)
);


-----------------------------------------------------------------------------------------------
-- CLAIM
-----------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS "claim" CASCADE;
CREATE TABLE "claim" (
    "claim_id"  INTEGER generated ALWAYS as IDENTITY PRIMARY KEY,
    "detail_fk"      INTEGER         NOT NULL REFERENCES "order_detail"(detail_id),
    "client_fk"     INTEGER         NOT NULL,
    "cause"         TEXT            NOT NULL,
    "urgency"       urgency_options NOT NULL,
    "reported_date" TIMESTAMP       NOT NULL,
    "updated_by"    INTEGER         NOT NULL,
    "deleted_at"    TIMESTAMP,
    "created_at"    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CHECK (reported_date >= CURRENT_DATE - INTERVAL '31 days')
);