--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: _test; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA _test;


ALTER SCHEMA _test OWNER TO cargochat_u;

--
-- Name: channels; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA channels;


ALTER SCHEMA channels OWNER TO cargochat_u;

--
-- Name: common; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA common;


ALTER SCHEMA common OWNER TO cargochat_u;

--
-- Name: comp; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA comp;


ALTER SCHEMA comp OWNER TO cargochat_u;

--
-- Name: const; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA const;


ALTER SCHEMA const OWNER TO cargochat_u;

--
-- Name: lead; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA lead;


ALTER SCHEMA lead OWNER TO cargochat_u;

--
-- Name: lplace; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA lplace;


ALTER SCHEMA lplace OWNER TO cargochat_u;

--
-- Name: order; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA "order";


ALTER SCHEMA "order" OWNER TO cargochat_u;

--
-- Name: price_req; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA price_req;


ALTER SCHEMA price_req OWNER TO cargochat_u;

--
-- Name: privates; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA privates;


ALTER SCHEMA privates OWNER TO cargochat_u;

--
-- Name: user; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA "user";


ALTER SCHEMA "user" OWNER TO cargochat_u;

--
-- Name: utils; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA utils;


ALTER SCHEMA utils OWNER TO cargochat_u;

--
-- Name: vehicle; Type: SCHEMA; Schema: -; Owner: cargochat_u
--

CREATE SCHEMA vehicle;


ALTER SCHEMA vehicle OWNER TO cargochat_u;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: plpythonu; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpythonu WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpythonu; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpythonu IS 'PL/PythonU untrusted procedural language';


SET search_path = channels, pg_catalog;

--
-- Name: tp_ch_type; Type: TYPE; Schema: channels; Owner: cargochat_u
--

CREATE TYPE tp_ch_type AS ENUM (
    'group',
    'channel'
);


ALTER TYPE tp_ch_type OWNER TO cargochat_u;

SET search_path = comp, pg_catalog;

--
-- Name: tp_comp_relation_option1; Type: TYPE; Schema: comp; Owner: cargochat_u
--

CREATE TYPE tp_comp_relation_option1 AS ENUM (
    'any',
    'none',
    'request'
);


ALTER TYPE tp_comp_relation_option1 OWNER TO cargochat_u;

--
-- Name: tp_comp_relation_type; Type: TYPE; Schema: comp; Owner: cargochat_u
--

CREATE TYPE tp_comp_relation_type AS ENUM (
    'expedition',
    'transport',
    'social',
    'blacklist'
);


ALTER TYPE tp_comp_relation_type OWNER TO cargochat_u;

--
-- Name: tp_comp_state; Type: TYPE; Schema: comp; Owner: cargochat_u
--

CREATE TYPE tp_comp_state AS ENUM (
    'new',
    'pending',
    'owned'
);


ALTER TYPE tp_comp_state OWNER TO cargochat_u;

--
-- Name: tp_comp_tag; Type: TYPE; Schema: comp; Owner: cargochat_u
--

CREATE TYPE tp_comp_tag AS ENUM (
    'carrier',
    'expeditor',
    'shipper'
);


ALTER TYPE tp_comp_tag OWNER TO cargochat_u;

--
-- Name: tp_comp_taxation; Type: TYPE; Schema: comp; Owner: cargochat_u
--

CREATE TYPE tp_comp_taxation AS ENUM (
    'ОС',
    'УСН',
    'ЕНВД',
    'ПСН',
    'ЕСХН'
);


ALTER TYPE tp_comp_taxation OWNER TO cargochat_u;

SET search_path = "order", pg_catalog;

--
-- Name: tp_load_type; Type: TYPE; Schema: order; Owner: cargochat_u
--

CREATE TYPE tp_load_type AS ENUM (
    'back',
    'side',
    'top'
);


ALTER TYPE tp_load_type OWNER TO cargochat_u;

--
-- Name: tp_state; Type: TYPE; Schema: order; Owner: cargochat_u
--

CREATE TYPE tp_state AS ENUM (
    'created',
    'opened',
    'shipping',
    'canceled',
    'done',
    'closed'
);


ALTER TYPE tp_state OWNER TO cargochat_u;

SET search_path = "user", pg_catalog;

--
-- Name: tp_workspace; Type: TYPE; Schema: user; Owner: cargochat_u
--

CREATE TYPE tp_workspace AS ENUM (
    'carrier',
    'expeditor',
    'shipper'
);


ALTER TYPE tp_workspace OWNER TO cargochat_u;

SET search_path = vehicle, pg_catalog;

--
-- Name: tp_vehicle_type; Type: TYPE; Schema: vehicle; Owner: cargochat_u
--

CREATE TYPE tp_vehicle_type AS ENUM (
    'tent',
    'refrigerator',
    'thermos',
    'container',
    'tank',
    'closed'
);


ALTER TYPE tp_vehicle_type OWNER TO cargochat_u;

SET search_path = _test, pg_catalog;

--
-- Name: __deprected__comp_create(integer, text, json); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION __deprected__comp_create(i_user_id integer, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	iCompId integer;
	iOPF integer;
	tINN text;
	jTag json;
	iTag integer;
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
BEGIN
	
	RETURN error(-2000, 'comp_create is deprecated');
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iOPF := utils__text2int(cm->>'opf');
	IF (iOPF IS NULL) THEN RETURN error(-5, 'opf required'); END IF;
	
	tINN := cm->>'inn';
	IF (tINN IS NULL) THEN RETURN error(-2, 'inn required'); END IF;
	IF (iOPF =  1) AND (length(tINN) != 12) THEN RETURN error(-6, 'invalid inn length (12 required)'); END IF;
	IF (iOPF != 1) AND (length(tINN) != 10) THEN RETURN error(-6, 'invalid inn length (10 required)'); END IF;
	
	INSERT INTO comps (name, inn, ogrn, kpp, addr, x, y, ymap, j_doc)
	VALUES (
		cm->>'name',
		tINN,
		cm->>'ogrn',
		cm->>'kpp',
		cm->>'addr',
		utils__text2float(cm->>'x'),
		utils__text2float(cm->>'y'),
		(cm->'ymap')::jsonb,
		(cm->'j_doc')::jsonb
	);
	iCompId := lastval();
	RAISE LOG 'iCompId=%', iCompId;
	
	FOR jTag IN (
		SELECT * FROM json_array_elements((cm->>'tags')::json)
	) LOOP
		iTag := utils__text2int(jTag::text);
		--RAISE LOG 'jTag=% iTag=%', jTag::text, iTag;
		IF (iTag IS NOT NULL) THEN
			INSERT INTO rt_comp_tag (comp_id, tag) VALUES (iCompId, iTag);
		END IF;
	END LOOP;
	
	INSERT INTO rt_user_comp (user_id, comp_id) VALUES (i_user_id, iCompId);
	INSERT INTO perms (user_id, comp_id, perm_type) VALUES (i_user_id, iCompId, get_perm('unlimited'));
	
	RETURN json_build_object('comp_id', iCompId);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'comp_create failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		IF (eTable = 'comps') THEN
			--IF (SQLSTATE = '23505') AND (eConstraint = 'comps_inn_idx') THEN RETURN error(-1, 'inn not unique'); END IF;  -- unique_violation
			--IF (SQLSTATE = '23505') AND (eConstraint = 'comps_ogrn_idx') THEN RETURN error(-3, 'ogrn not unique'); END IF;  -- unique_violation
			IF (SQLSTATE = '23502') AND (eCol = 'inn') THEN RETURN error(-2, 'inn required'); END IF;  -- not_null_violation
			IF (SQLSTATE = '23502') AND (eCol = 'ogrn') THEN RETURN error(-4, 'ogrn required'); END IF;  -- not_null_violation
		END IF;
		IF (eTable = 'rt_comp_tag') AND (SQLSTATE = '23503') THEN  -- foreign_key_violation
			CASE eConstraint
				WHEN 'comps_tags_tag_fkey' THEN RETURN error(-10, 'invalid tags');
			ELSE END CASE;
		END IF;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION _test.__deprected__comp_create(i_user_id integer, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: __deprected__join_request_accept(integer, text, json); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION __deprected__join_request_accept(i_user_id integer, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	iUserId integer;
	iCompId integer;
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId = utils__text2int(cm->>'comp_id');
	iUserId = utils__text2int(cm->>'user_id');
	IF (iUserId IS NULL) OR (iCompId IS NULL) THEN RETURN error(-2000, 'invalid params'); END IF;
	
	IF (perm_test(i_user_id, iCompId, 'comp_join_requests_manage') IS NOT TRUE) THEN RETURN error(-2, 'no perms'); END IF;
	
	UPDATE join_requests SET state = 1 WHERE (user_id = iUserId) AND (comp_id = iCompId);
	IF (NOT FOUND) THEN RETURN error(-1, 'request not found'); END IF;
	
	INSERT INTO rt_user_comp (user_id, comp_id) VALUES (iUserId, iCompId);
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'join_request_accept failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		IF (eTable = 'rt_user_comp') AND (SQLSTATE = '23505') THEN  -- unique_violation
			RETURN json_build_object();  -- ignore
		END IF;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION _test.__deprected__join_request_accept(i_user_id integer, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: __deprected__join_request_create(integer, text, json); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION __deprected__join_request_create(i_user_id integer, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	iCompId integer;
	eTable text;
	eCol text;
	eDetail text;
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId = utils__text2int(cm->>'comp_id');
	IF (iCompId IS NULL) THEN RETURN error(-2000, 'invalid params'); END IF;
	
	PERFORM * FROM rt_user_comp WHERE (user_id = i_user_id) AND (comp_id = iCompId);
	IF (FOUND) THEN RETURN error(-2, 'already inside'); END IF;
	
	INSERT INTO join_requests (user_id, comp_id, state) VALUES (i_user_id, iCompId, 0);
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'join_request_create failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		IF (SQLSTATE = '23503') THEN RETURN error(-1, 'foreign_key_violation'); END IF;
		IF (SQLSTATE = '23505') THEN RETURN error(-2, 'unique_violation'); END IF;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION _test.__deprected__join_request_create(i_user_id integer, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: __deprected__join_request_delete(integer, text, json); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION __deprected__join_request_delete(i_user_id integer, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	iCompId integer;
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId = utils__text2int(cm->>'comp_id');
	IF (iCompId IS NULL) THEN RETURN error(-2000, 'invalid params'); END IF;
	
	DELETE FROM join_requests WHERE (user_id = i_user_id) AND (comp_id = iCompId);
	IF (NOT FOUND) THEN RETURN error(-1, 'request not found'); END IF;
	
	RETURN json_build_object();
	
END;
$$;


ALTER FUNCTION _test.__deprected__join_request_delete(i_user_id integer, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: __deprected__join_request_refuse(integer, text, json); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION __deprected__join_request_refuse(i_user_id integer, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	iUserId integer;
	iCompId integer;
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId = utils__text2int(cm->>'comp_id');
	iUserId = utils__text2int(cm->>'user_id');
	IF (iUserId IS NULL) OR (iCompId IS NULL) THEN RETURN error(-2000, 'invalid params'); END IF;
	
	-- todo: RETURN error(-2, 'no perms');
	
	UPDATE join_requests SET state = 2 WHERE (user_id = iUserId) AND (comp_id = iCompId);
	IF (NOT FOUND) THEN RETURN error(-1, 'request not found'); END IF;
	
	RETURN json_build_object();
	
END;
$$;


ALTER FUNCTION _test.__deprected__join_request_refuse(i_user_id integer, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: graph(json); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION graph(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	-- !!!! DEPRACATED !!!
	
	jQuery json;
	jResults json;
	jResult json;
	aItems text[];
	tItem text;
	jItem json;
	jItemTable json;
	tSrc text;
	aFields text[];
	aFields2 text[];
	tRequiredFiled text;
	bRequiredFieldExists boolean;
	tField text;
	aFilters json[];
	aWhere text[];
	jFilter json;
	aFilter text[];
	tFilterCol text;
	tFilterOp text;
	tFilterVal text;
	fFilterVal double precision;
	aFilterInText text[];
	aFilterInFloat double precision[];
	tWhere text;
	iOffset bigint;
	iLimit bigint;
	tOrder text;
	tDir text;
	tSQL text;
	iTotal bigint;
	aData json[];
	jSubs json;
	aSubs text[];
	tSub text;
	tSubSrc text;
	jSub json;
	jSubFilters json;
	tRelationType text;
	tRelation text;
	jRelations json;
	jRelation json;
	tRelationIs text;
	tRelationSelect text;
	tRelationFrom text;
	tRelationWhere text;
	jAvailabaleRelations json;
	jAvailabaleRelation json;
	tRelationParentValue text;
	aRelationSubValues text[];
	oRec1 record;
	aRec1 json[];
	jRec1 json;
	jSubResult json;
	
	jTables json = '{
		
		"comps": {
			
			"available_fields": {
				"id":         "number",
				"name":       "text",
				"opf":        "text",
				"inn":        "text",
				"ogrn":       "text",
				"kpp":        "text",
				"addr":       "text",
				"x":          "number",
				"y":          "number",
				"email":      "text",
				"phone":      "text",
				"ati_code":   "number",
				"web_site":   "text",
				"work_hours": "text",
				"rel_trade_from":       "text",
				"rel_trade_to":         "text",
				"rel_transport_from":   "text",
				"rel_transport_to":     "text",
				"hard_tag_trade_from":  "text",
				"state":      "text",
				"taxation":   "text",
				"ctime":      "timestamp",
				"dadata":     "json",
				"ymap":       "json",
				"j_doc":      "json"
			},
			
			"required_field": "id",
			
			"relations":{
				
				"dadata_opf":{
					"default": {"select": "code", "from": "dadata_opf", "where": "code", "is": "opf", "filter": "code"}
				},
				
				"tenders":{
					"default":              {"select": "tender_id", "from": "rt_comp_tender", "where": "comp_id",       "is": "id", "filter": "id"},
					"comp_owner_of_tender": {"select": "id",        "from": "tenders",        "where": "owner_comp_id", "is": "id", "filter": "id"}
				},
				
				"users":{
					"default":{"select": "id", "from": "users", "where": "comp_id", "is": "id", "filter": "id"}
				},
				
				"comp_tags":{
					"default":{"select": "comp_tag_id", "from": "comp_tags", "where": "comp_id", "is": "id", "filter": "comp_tag_id"}
				},
				
				"comp_relations":{
					"default":{"select": "comp_from", "from": "comp_relations", "where": "comp_from", "is": "id", "filter": "comp_from"},
					"reverse":{"select": "comp_to",   "from": "comp_relations", "where": "comp_to",   "is": "id", "filter": "comp_to"}
				},
				
				"comp_relation_requests":{
					"default":{"select": "comp_relation_request_id", "from": "comp_relation_requests", "where": "comp_from", "is": "id", "filter": "comp_relation_request_id"},
					"reverse":{"select": "comp_relation_request_id", "from": "comp_relation_requests", "where": "comp_to",   "is": "id", "filter": "comp_relation_request_id"}
				},
				
				"user_invites":{
					"default":{"select": "user_invite_id", "from": "user_invites", "where": "comp_id", "is": "id", "filter": "user_invite_id"}
				}
				
			}
			
		},
		
		"user_invites": {
			
			"available_fields": {
				"user_invite_id":  "number",
				"ctime":           "timestamp",
				"email":           "text",
				"fio":             "text",
				"comp_id":         "number"
			},
			
			"required_field": "user_invite_id"
			
		},
		
		"dadata_opf": {
			
			"available_fields": {
				"code":  "text",
				"full":  "text",
				"short": "text"
			},
			
			"required_field": "code"
			
		},
		
		"comp_relations": {
			
			"available_fields": {
				"relation_id":   "number",
				"relation_type": "text",
				"comp_from":     "number",
				"comp_to":       "number"
			},
			
			"required_field": "relation_id",
			
			"relations":{
				
				"comps":{
					"default": {"select": "comp_to",   "from": "comp_relations", "where": "relation_id", "is": "relation_id", "filter": "id"},
					"from":    {"select": "comp_from", "from": "comp_relations", "where": "relation_id", "is": "relation_id", "filter": "id"}
				}
				
			}
			
		},
		
		"comp_relation_requests":{
			
			"available_fields": {
				"comp_relation_request_id":  "number",
				"relation_type":             "text",
				"comp_from":                 "number",
				"comp_to":                   "number",
				"ctime":                     "timestamp",
				"comp_invite_id":            "number"
			},
			
			"required_field": "relation_id"
			
		},
		
		"comp_tags": {
			
			"available_fields": {
				"comp_tag_id": "number",
				"comp_id":     "number",
				"tag":         "text"
			},
			
			"required_field": "comp_tag_id"
			
		},
		
		"users": {
			
			"available_fields": {
				"id":          "number",
				"flags":       "number",
				"first_name":  "text",
				"pat_name":    "text",
				"last_name":   "text",
				"comp_id":     "number",
				"icq":         "text",
				"mobile":      "text",
				"skype":       "text",
				"email":       "text",
				"gender":      "text",
				"birthday":    "text",
				"j_doc":       "json"
			},
			
			"required_field": "id",
			
			"relations":{
				
				"comps":{
					"default":{"select": "id", "from": "comps", "where": "id", "is": "comp_id", "filter": "id"}
				},
				"user_perm":{
					"default":{"select": "user_id", "from": "user_perm", "where": "user_id", "is": "id", "filter": "user_id"}
				},
				"perms":{
					"default":{"select": "perm_id", "from": "perms", "where": "user_id", "is": "id", "filter": "perm_id"}
				}
				
			}
			
		},
		
		"user_perm":{
			
			"available_fields": {
				"perm_type":   "number",
				"user_id":     "number"
			},
			
			"required_field": "perm_type"
			
		},
		
		"perms":{
			
			"available_fields": {
				"perm_id":     "number",
				"user_id":     "number",
				"comp_id":     "number",
				"perm_type":   "number"
			},
			
			"required_field": "perm_id"
			
		},
		
		"tenders": {
			
			"available_fields": {
				"id":            "number",
				"owner_comp_id": "number",
				"name":          "text",
				"ctime":         "timestamp",
				"stime":         "timestamp",
				"etime":         "timestamp",
				"organizer":     "text",
				"requests":      "text"
			},
			
			"required_field": "id",
			
			"relations":{
				
				"comps":{
					"default":              {"select": "comp_id",       "from": "rt_comp_tender", "where": "tender_id", "is": "id", "filter": "id"},
					"comp_owner_of_tender": {"select": "owner_comp_id", "from": "tenders",        "where": "id",        "is": "id", "filter": "id"}
				},
				
				"tender_invites":{
					"default": {"select": "id", "from": "tender_invites", "where": "tender_id", "is": "id", "filter": "id"}
				}
				
			}
			
		},
		
		"tender_invites": {
			
			"available_fields": {
				"id":            "number",
				"tender_id":     "number",
				"comp_id":       "number",
				"state":         "number"
			},
			
			"required_field": "id"
			
		}
		
	}';
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
BEGIN
	
	--RAISE LOG '';
	--RAISE LOG '';
	--RAISE LOG '';
	--RAISE LOG 'jSchema=%', jSchema;
	--RAISE LOG 'jSchema->users=%', jSchema->'users';
	
	jQuery := cm->'query';
	--RAISE LOG '==== jQuery=%', jQuery;
	IF (jQuery IS NULL) THEN RETURN error(-2000, 'invalid query (null)'); END IF;
	
	SELECT array_agg(c) FROM json_object_keys(jQuery) c INTO aItems;
	--RAISE LOG 'aItems=%', aItems;

	jResults := json_build_object();
	
	FOREACH tItem IN ARRAY aItems LOOP
		jItem := jQuery->tItem;
		--RAISE LOG 'tItem=%', tItem;
		jResult := json_build_object();
		tSrc := coalesce(jItem->>'src', tItem);
		jItemTable := jTables->tSrc;
		--RAISE LOG 'jItemTable=%', jItemTable;
		--RAISE LOG 'tSrc=%', tSrc;
		IF (jItemTable IS NULL) THEN
			jResults := utils__j_merge(jResults, json_build_object(tItem, json_build_object('error', 'invalid src `' || tSrc || '` for item `' || tItem || '`')));
			CONTINUE;
		END IF;
		
		tRequiredFiled := jItemTable->>'required_field';
		--RAISE LOG 'tRequiredFiled=%', tRequiredFiled;
		SELECT array_agg(c) FROM json_array_elements_text(jItem->'fields') c INTO aFields;
		--RAISE LOG 'aFields=%', aFields;
		IF (aFields IS NULL) THEN
			--aFields := ARRAY[]::text[];
			SELECT array_agg(quote_ident(c)) FROM json_object_keys(jItemTable->'available_fields') c INTO aFields2;
		ELSE
			aFields2 := ARRAY[]::text[];
			FOREACH tField IN ARRAY aFields LOOP
				--RAISE LOG 'tField=%', tField;
				--RAISE LOG 'available=%', jItemTable->'available_fields'->>tField;
				IF ((jItemTable->'available_fields'->>tField) IS NOT NULL) THEN
					aFields2 := aFields2 || quote_ident(tField);
				END IF;
			END LOOP;
			--RAISE LOG 'aFields2=%', aFields2;
			
			--RAISE LOG 'required_field=%', tRequiredFiled;
			SELECT aFields2 @> ARRAY[tRequiredFiled] INTO bRequiredFieldExists;
			--RAISE LOG 'bRequiredFieldExists=%', bRequiredFieldExists;
			IF (bRequiredFieldExists IS NOT TRUE) THEN
				aFields2 := quote_ident(tRequiredFiled) || aFields2;
			END IF;
			--RAISE LOG 'aFields2=%', aFields2;
		END IF;
		
		SELECT array_agg(c) FROM json_array_elements(jItem->'filters') c INTO aFilters;
		--RAISE LOG 'aFilters=%', aFilters;
		IF (aFilters IS NULL) THEN
			aFilters := ARRAY[]::json[];
		END IF;
		aWhere := ARRAY[]::text[];
		FOREACH jFilter IN ARRAY aFilters LOOP
			--RAISE LOG 'jFilter=%', jFilter;
			--RAISE LOG 'json_array_length(jFilter)=%', json_array_length(jFilter);
			--SELECT array_agg(c) FROM json_array_elements_text(jFilter) c INTO aFilter;
			--RAISE LOG 'aFilter=%', aFilter;
			aFilter := utils__json2array(jFilter);
			--RAISE LOG 'jFilter.array=%', aFilter;
			CONTINUE WHEN (aFilter IS NULL) OR (array_length(aFilter, 1) != 3);
			tFilterCol := aFilter[1];
			tFilterOp := aFilter[2];
			tFilterVal := aFilter[3];
			--RAISE LOG 'filter: col=% op=% val=%', tFilterCol, tFilterOp, tFilterVal;
			--RAISE LOG 'filtered field: %', jItemTable->'available_fields'->>tFilterCol;
			CASE tFilterOp
				WHEN 'eq' THEN
					CASE jItemTable->'available_fields'->>tFilterCol
						WHEN 'number' THEN
							fFilterVal := utils__text2float(tFilterVal);
							IF (fFilterVal IS NOT NULL) THEN
								aWhere := aWhere || (quote_ident(tFilterCol) || ' = ' || fFilterVal);
							END IF;
						WHEN 'text' THEN
							aWhere := aWhere || (quote_ident(tFilterCol) || ' = ' || quote_literal(tFilterVal));
						WHEN 'timestamp' THEN
							aWhere := aWhere || (quote_ident(tFilterCol) || ' = ' || quote_literal(tFilterVal));
						ELSE
					END CASE;
				WHEN 'lt' THEN
					CASE jItemTable->'available_fields'->>tFilterCol
						WHEN 'number' THEN
							fFilterVal := utils__text2float(tFilterVal);
							IF (fFilterVal IS NOT NULL) THEN
								aWhere := aWhere || (quote_ident(tFilterCol) || ' < ' || fFilterVal);
							END IF;
						WHEN 'text' THEN
							aWhere := aWhere || (quote_ident(tFilterCol) || ' < ' || quote_literal(tFilterVal));
						WHEN 'timestamp' THEN
							aWhere := aWhere || (quote_ident(tFilterCol) || ' < ' || quote_literal(tFilterVal));
						ELSE
					END CASE;
				WHEN 'gt' THEN
					CASE jItemTable->'available_fields'->>tFilterCol
						WHEN 'number' THEN
							fFilterVal := utils__text2float(tFilterVal);
							IF (fFilterVal IS NOT NULL) THEN
								aWhere := aWhere || (quote_ident(tFilterCol) || ' > ' || fFilterVal);
							END IF;
						WHEN 'text' THEN
							aWhere := aWhere || (quote_ident(tFilterCol) || ' > ' || quote_literal(tFilterVal));
						WHEN 'timestamp' THEN
							aWhere := aWhere || (quote_ident(tFilterCol) || ' > ' || quote_literal(tFilterVal));
						ELSE
					END CASE;
				WHEN 'in' THEN
					--RAISE LOG 'filter IN: %', tFilterVal;
					--RAISE LOG 'filter IN: %', jFilter->2;
					aFilterInText := utils__json2array(jFilter->2);
					IF (aFilterInText IS NULL) THEN
						aFilterInText := ARRAY[]::text[];
					END IF;
					CASE jItemTable->'available_fields'->>tFilterCol
						WHEN 'number' THEN
							aFilterInFloat := ARRAY[]::double precision[];
							FOREACH tFilterVal IN ARRAY aFilterInText LOOP
								fFilterVal := utils__text2float(tFilterVal);
								IF (fFilterVal IS NOT NULL) THEN
									aFilterInFloat := aFilterInFloat || fFilterVal;
								END IF;
							END LOOP;
							--RAISE LOG 'filter IN: %', jFilter->2->2;
							--RAISE LOG 'filter IN: %', aFilterInFloat;
							IF (array_length(aFilterInFloat, 1) > 0) THEN
								aWhere := aWhere || (quote_ident(tFilterCol) || ' IN (' || array_to_string(aFilterInFloat, ',') || ')');
							END IF;
						ELSE
							IF (array_length(aFilterInText, 1) > 0) THEN
								aWhere := aWhere || (quote_ident(tFilterCol) || ' IN (''' || array_to_string(aFilterInText, ''',''') || ''')');
							END IF;
					END CASE;
				WHEN 'contains' THEN
					CASE jItemTable->'available_fields'->>tFilterCol
						WHEN 'text' THEN
							--aWhere := aWhere || ('strpos(' || quote_ident(tFilterCol) || ',' || quote_literal(tFilterVal) || ') > 0');
							aWhere := aWhere || (quote_ident(tFilterCol) || ' ~* E' || quote_literal(tFilterVal));
						ELSE
					END CASE;
				ELSE
			END CASE;
			-- aWhere := aWhere || (quote_ident(aFilter[1]) || ' = ' || quote_literal(aFilter[3]));
			
			
		END LOOP;
		--RAISE LOG 'aWhere=%', aWhere;
		
		
		
		tWhere := '';
		IF (array_length(aWhere, 1) > 0) THEN
			tWhere := ' WHERE (' || array_to_string(aWhere, ') AND (') || ')';
		END IF;
		
		tSQL := 'CREATE TEMP TABLE tmp ON COMMIT DROP AS SELECT ' || array_to_string(aFields2, ',') || ' FROM ' || quote_ident(tSrc) || tWhere;
		--RAISE LOG 'tSQL=%', tSQL;
		
		EXECUTE tSQL;
		SELECT count(*) FROM tmp INTO iTotal;
		
		iOffset := utils__text2int(jItem->>'offset');
		IF (iOffset IS NULL) THEN
			iOffset := 0;
		END IF;
		
		iLimit := utils__text2int(jItem->>'limit');
		IF (iLimit IS NULL) THEN
			iLimit := 50;
		ELSIF (iLimit > 500) THEN
			iLimit := 500;
		END IF;
		
		tOrder := jItem->>'order';
		IF (tOrder IS NOT NULL) AND ((jItemTable->'available_fields'->>tOrder) IS NULL) THEN
			tOrder := NULL;
		END IF;
		IF (tOrder IS NOT NULL) THEN
			--RAISE LOG 'tOrder=%', tOrder;
			tDir := jItem->>'dir';
			IF (tDir IS NOT NULL) AND (NOT (tDir = ANY(ARRAY['ASC','DESC']))) THEN
				tDir := NULL;
			END IF;
		END IF;
		
		tSQL := 'SELECT ' || array_to_string(aFields2, ',') || ' FROM tmp';
		IF (tOrder IS NOT NULL) THEN
			tSQL := tSQL || ' ORDER BY ' || quote_ident(tOrder);
			IF (tDir IS NOT NULL) THEN
				tSQL := tSQL || ' ' || tDir;
			END IF;
		END IF;
		IF (iOffset > 0) THEN tSQL := tSQL || ' OFFSET ' || iOffset; END IF;
		IF (iLimit > 0)  THEN tSQL := tSQL || ' LIMIT '  || iLimit;  END IF;
		--RAISE LOG 'tSQL=%', tSQL;
		
		jSubs := jItem->'sub';
		SELECT array_agg(c) FROM json_object_keys(jSubs) c INTO aSubs;
		IF (aSubs IS NULL) THEN
			aSubs := ARRAY[]::text[];
		END IF;
		--RAISE LOG 'aSubs=%', aSubs;
		
		aRec1 = ARRAY[]::json[];
		FOR oRec1 IN EXECUTE tSQL LOOP
			aRec1 := aRec1 || row_to_json(oRec1);
		END LOOP;
		DROP TABLE tmp;
		
		aData := ARRAY[]::json[];
		FOREACH jRec1 IN ARRAY aRec1 LOOP
			--DROP TABLE IF EXISTS "tmp";
			--jRec1 := row_to_json(oRec1);
			--RAISE LOG 'jRec1=%', jRec1;
			--RAISE LOG 'jRec1->>%=%', tRequiredFiled, jRec1->>tRequiredFiled;
			FOREACH tSub IN ARRAY aSubs LOOP
				--RAISE LOG 'tSub=%', tSub;
				jSub := jSubs->tSub;
				--RAISE LOG 'jSub=%', jSub;
				tSubSrc := jSub->>'src';
				IF (tSubSrc IS NULL) THEN
					tSubSrc := tSub;
				END IF;
				
				tRelationType := json_typeof(jSub->'relation');
				--RAISE LOG 'relation=% type=%', jSub->>'relation', tRelationType;
				IF (tRelationType IS NULL) OR (tRelationType = 'null') THEN
					tRelation := 'default';
					--RAISE LOG ' relation is null ot NULL, value=%', tRelation;
					jRelation := jItemTable->'relations'->tSubSrc->tRelation;
				--ELSIF (tRelationType = 'object') THEN
				--	tRelation := '__custom__';
				--	jRelation := jSub->'relation';
				ELSIF (tRelationType = 'string') THEN
					tRelation := jSub->>'relation';
					--RAISE LOG ' relation is string, value=%', tRelation;
					jRelation := jItemTable->'relations'->tSubSrc->tRelation;
				ELSE
					tRelation := jSub->>'relation';
					jRec1 := utils__j_merge(jRec1, json_build_object(tSub, json_build_object('error', 'invalid relation type `' || tRelation || '` from `' || tSrc || '` to `' || tSubSrc || '`')));
					CONTINUE;
				END IF;
				
				--RAISE LOG 'jRelation=%', jRelation;
				
				IF (jRelation IS NULL) THEN
					jRec1 := utils__j_merge(jRec1, json_build_object(tSub, json_build_object('error', 'invalid relation `' || tRelation || '` from `' || tSrc || '` to `' || tSubSrc || '`')));
					CONTINUE;
				END IF;
				
				tRelationIs := jRelation->>'is';
				IF ((jItemTable->'available_fields'->>tRelationIs) IS NULL) THEN
					jRec1 := utils__j_merge(jRec1, json_build_object(tSub, json_build_object('error', 'related field `' || tRelationIs || '` not availeble in `' || tSrc || '`')));
					CONTINUE;
				END IF;
				-- "select":"user_id", "from":"rt_user_comp", "where":"comp_id", "is":"id", "filter":"id"
				--RAISE LOG ' -- tRelationIs=%', tRelationIs;
				--RAISE LOG ' -- tSrc=%', tSrc;
				--RAISE LOG ' -- tRequiredFiled=%', tRequiredFiled;
				--RAISE LOG ' -- jRec1->>tRequiredFiled=%', jRec1->>tRequiredFiled;
				tSQL := 'SELECT ' || quote_ident(tRelationIs) || ' FROM ' || quote_ident(tSrc) || ' WHERE (' || quote_ident(tRequiredFiled) || ' = ' || (jRec1->>tRequiredFiled) || ') LIMIT 1';
				IF (tSQL IS NULL) THEN
					jRec1 := utils__j_merge(jRec1, json_build_object(tSub, json_build_object('error', 'invalid tRelationParentValue query')));
					CONTINUE;
				END IF;
				--RAISE LOG 'tRelationParentValue tSQL: %', tSQL;
				EXECUTE tSQL INTO tRelationParentValue;
				--RAISE LOG 'tRelationParentValue=%', tRelationParentValue;
				
				tRelationSelect := jRelation->>'select';
				tRelationFrom := jRelation->>'from';
				tRelationWhere := jRelation->>'where';
				
				--jAvailabaleRelations := jItemTable->'available_relations'->tSubSrc;
				--RAISE LOG 'jAvailabaleRelations for % is %', tSubSrc, jAvailabaleRelations;
				
				--IF (jAvailabaleRelations IS NULL) THEN
				--	jRec1 := utils__j_merge(jRec1, json_build_object(tSub, json_build_object('error', 'no relations available from `' || tSrc || '` to `' || tSubSrc ||'`')));
				--	CONTINUE;
				--END IF;
				
				--jAvailabaleRelation := jAvailabaleRelations->tRelationFrom;
				--IF (jAvailabaleRelation IS NULL) THEN
				--	jRec1 := utils__j_merge(jRec1, json_build_object(tSub, json_build_object('error', 'relation form `' || tSrc ||'` to `' || tSubSrc || '` not available by `' || tRelationFrom || '`')));
				--	CONTINUE;
				--END IF;
				
				IF (tRelationParentValue IS NULL) THEN
					jRec1 := utils__j_merge(jRec1, json_build_object(tSub, json_build_object('total', 0, 'data', json_build_array())));
					CONTINUE;
				END IF;
				
				tSQL := 'SELECT array_agg(' || quote_ident(tRelationSelect) || ') FROM ' || quote_ident(tRelationFrom) || ' WHERE ' || quote_ident(tRelationWhere) || ' = ' || quote_literal(tRelationParentValue);
				--RAISE LOG 'aRelationSubValues SQL="%" tRelationSelect=% tRelationFrom=% tRelationWhere=% tRelationParentValue=%', tSQL, tRelationSelect, tRelationFrom, tRelationWhere, tRelationParentValue;
				EXECUTE tSQL INTO aRelationSubValues;
				--RAISE LOG 'aRelationSubValues SQL="%" values="%"', tSQL, aRelationSubValues;
				IF (aRelationSubValues IS NULL) THEN
					jRec1 := utils__j_merge(jRec1, json_build_object(tSub, json_build_object('total', 0, 'data', json_build_array())));
					CONTINUE;
				END IF;
				jSubFilters := jSub->'filters';
				IF (jSubFilters IS NULL) THEN jSubFilters := json_build_array(); END IF;
				
				-- merge filters
				SELECT json_agg(c) FROM (
				SELECT json_array_elements(jSubFilters) c
				UNION ALL
				SELECT json_array_elements(json_build_array(json_build_array(jRelation->>'filter','in',aRelationSubValues))) c) as t
				INTO jSubFilters;
				--RAISE LOG 'jSubFilters=%', jSubFilters;
				
				jSub := utils__j_merge(jSub, json_build_object('filters', jSubFilters));
				--RAISE LOG 'jSub=%', jSub;
				
				jSubResult := graph(json_build_object('query', json_build_object(tSub, jSub)));
				--RAISE LOG 'jSubResult=%', jSubResult;
				
				jRec1 := utils__j_merge(jRec1, jSubResult);
				
			END LOOP;
			aData := aData || jRec1;
		END LOOP;
		
		jResults := utils__j_merge(jResults, json_build_object(tItem, json_build_object('total', iTotal, 'data', aData)));
		
	END LOOP;
	
	
	
	
	
	RETURN jResults;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG '_query failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		RAISE LOG 'eStack: %', eStack;
		RETURN error(-2000, 'query failed');
END;
$$;


ALTER FUNCTION _test.graph(cm json) OWNER TO cargochat_u;

--
-- Name: jsonb_merge(jsonb, jsonb); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION jsonb_merge(jsonb, jsonb) RETURNS jsonb
    LANGUAGE sql
    AS $_$
WITH json_union AS (
    SELECT * FROM JSONB_EACH($1)
    UNION ALL
    SELECT * FROM JSONB_EACH($2)
) SELECT JSON_OBJECT_AGG(key, value)::JSONB
     FROM json_union
     WHERE key NOT IN (SELECT key FROM json_union WHERE value ='null');
$_$;


ALTER FUNCTION _test.jsonb_merge(jsonb, jsonb) OWNER TO cargochat_u;

--
-- Name: pymax(integer, integer); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION pymax(a integer, b integer) RETURNS integer
    LANGUAGE plpythonu
    AS $$
from random import random

l = [51, 3, 67, 53, 83, 44, 45, 84, 35, 87, 63, 25, 82, 11, 38, 41, 64, 77, 73, 22, 21, 61, 91, 26, 46, 71, 8, 76, 66, 15, 10, 52, 13, 56, 20, 6, 36, 19, 50, 92, 86, 0, 12, 48, 30, 89, 68, 32, 79, 72, 24, 23, 47, 78, 57, 58, 31, 70, 34, 39, 75, 16, 88, 62, 43, 74, 27, 85, 1, 28, 14, 55, 80, 5, 81, 95, 65, 9, 42, 2, 7, 54, 33, 90, 4, 40, 59, 29, 93, 49, 37, 94, 18, 60, 69, 17];

v1 = int(random() * 0xFFFFFFFFFFFFFFFF)
v2 = int(random() * 0xFFFFFFFF)

plpy.log('log {}'.format(v1))



if a > b:
	return a
return b
$$;


ALTER FUNCTION _test.pymax(a integer, b integer) OWNER TO cargochat_u;

--
-- Name: test3(boolean, bigint, bigint); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION test3(b_make boolean, i_id bigint, i_iters bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	t0 timestamp;
	iId bigint;
	iv bigint;
	cv text;
	tSQL text;
	
BEGIN
	
	t0 = timeofday()::timestamp;
	
	IF b_make THEN
		
		--INSERT INTO _test.test3(iparams) VALUES ((SELECT ARRAY_AGG((random()*2^32)::bigint) FROM generate_series(1,1000000) n));
		
		INSERT INTO _test.test3(
			iparams,
			cparams,
			jparams
		)
		VALUES (
			--(SELECT ARRAY_AGG((random()*2^32)::bigint) FROM generate_series(1,100000) n),
			--(SELECT ARRAY_AGG(md5(random()::text)) FROM generate_series(1,100000) n)
			(SELECT ARRAY_AGG((random()*2^32)::bigint) FROM generate_series(1,1) n),
			(SELECT ARRAY_AGG(md5(random()::text)) FROM generate_series(1,1) n),
			(SELECT JSON_AGG(md5(random()::text)) FROM generate_series(1,100000) n)::jsonb
		)
		RETURNING "id" INTO iId;
		
	END IF;
	
	IF iId IS NULL THEN iId := i_id; END IF;
	
	IF i_iters > 0 THEN
		
		FOR i IN 1..i_iters LOOP
			
			--SELECT iparams[(random()*10)::bigint] INTO iv FROM "_test"."test3" WHERE "id" = iId;
			--SELECT iparams[(random()*3)::bigint] INTO iv FROM "_test"."test3" WHERE "id" = iId;
			
			--SELECT cparams[(random()*100000)::bigint] INTO cv FROM "_test"."test3" WHERE "id" = iId;
			--SELECT cparams[(random()*3)::bigint] INTO cv FROM "_test"."test3" WHERE "id" = iId;
			
			--SELECT val1 + (random()*100000)::bigint INTO iv FROM "_test"."test3" WHERE "id" = iId;
			--SELECT CASE WHEN random()>1/3 THEN val1 WHEN random()>1/2 THEN val2 ELSE val3 END INTO iv FROM "_test"."test3" WHERE "id" = iId;
			/*
			CASE ((random()*9)::bigint)
				WHEN 0 THEN SELECT val1  INTO iv FROM "_test"."test3" WHERE "id" = iId;
				WHEN 1 THEN SELECT val2  INTO iv FROM "_test"."test3" WHERE "id" = iId;
				WHEN 2 THEN SELECT val3  INTO iv FROM "_test"."test3" WHERE "id" = iId;
				WHEN 3 THEN SELECT val4  INTO iv FROM "_test"."test3" WHERE "id" = iId;
				WHEN 4 THEN SELECT val5  INTO iv FROM "_test"."test3" WHERE "id" = iId;
				WHEN 5 THEN SELECT val6  INTO iv FROM "_test"."test3" WHERE "id" = iId;
				WHEN 6 THEN SELECT val7  INTO iv FROM "_test"."test3" WHERE "id" = iId;
				WHEN 7 THEN SELECT val8  INTO iv FROM "_test"."test3" WHERE "id" = iId;
				WHEN 8 THEN SELECT val9  INTO iv FROM "_test"."test3" WHERE "id" = iId;
				WHEN 9 THEN SELECT val10 INTO iv FROM "_test"."test3" WHERE "id" = iId;
			ELSE END CASE;
			*/
			--EXECUTE format('SELECT val%s FROM "_test"."test3" WHERE "id" = %L', (random()*9)::bigint + 1, iId) INTO iv;  -- x5
			
			--SELECT jparams->(random()*10)::integer INTO cv FROM "_test"."test3" WHERE "id" = iId;
			
			--UPDATE "_test"."test3" SET iparams[(random()*10)::bigint] = (random()*100)::bigint WHERE "id" = iId;
			--UPDATE "_test"."test3" SET "jparams" = "_test"."jsonb_merge"("jparams", ) WHERE "id" = iId;
			
		END LOOP;
		
	END IF;
	
	RETURN json_build_object(
		'iId', iId,
		'time', date_part('seconds', timeofday()::timestamp - t0)
	);
	
END;
$$;


ALTER FUNCTION _test.test3(b_make boolean, i_id bigint, i_iters bigint) OWNER TO cargochat_u;

--
-- Name: testcur1(); Type: FUNCTION; Schema: _test; Owner: cargochat_u
--

CREATE FUNCTION testcur1() RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	t0 timestamp;
	tq text;
	c1 refcursor;
	iTotal bigint;
	rec1 record;

BEGIN
	
	RAISE LOG '----------------------------------------------';
	
	t0 = timeofday()::timestamp;
	IF TRUE THEN
		--OPEN c1 FOR select * from "_test".test1 where t1 like '%12345%';
		tq := 'select * from "_test".test1';
		OPEN c1 FOR EXECUTE tq;
		MOVE FORWARD ALL IN c1;
		GET DIAGNOSTICS iTotal = ROW_COUNT;
		
		MOVE FIRST IN c1;
		FETCH c1 INTO rec1;
		
		CLOSE c1;
	ELSE
		SELECT count(*) INTO iTotal FROM _test.test1;
	END IF;
	
	RAISE LOG '----------------------------------------------';
	
	RETURN json_build_object(
		'iTotal', iTotal,
		't', date_part('seconds', timeofday()::timestamp - t0),
		'rec1', row_to_json(rec1)
	);
	
END;$$;


ALTER FUNCTION _test.testcur1() OWNER TO cargochat_u;

SET search_path = channels, pg_catalog;

--
-- Name: correct(json, json); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION correct(cl json, cm json) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	iUserId bigint;
	iChannelId bigint;
	iMessageId bigint;
	tBody text;
	tsCtime timestamp without time zone;
	bDeleted boolean;
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'channels.correct % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iChannelId := utils__text2bigint(cm->>'channel_id');
	iMessageId := utils__text2bigint(cm->>'message_id');
	tBody := cm->>'body';
	IF (iChannelId IS NULL) THEN RETURN error(-1, 'channel_id required'); END IF;
	IF (iMessageId IS NULL) THEN RETURN error(-1, 'message_id required'); END IF;
	IF (tBody IS NULL) THEN RETURN error(-1, 'body required'); END IF;
	
	SELECT ctime, deleted INTO tsCtime, bDeleted FROM msg_channels_hist WHERE message_id = iMessageId AND channel_id = iChannelId AND user_id = iUserId;
	IF NOT FOUND THEN RETURN error(-1, format('message(%s) from user(%s) not found', iMessageId, iUserId)); END IF;
	IF bDeleted THEN RETURN error(-1, format('message(%s) already deleted', iMessageId)); END IF;
	
	--IF (utils__now_utc() - tsCtime) > '10 min'::interval THEN RETURN error(-1, 'too late'); END IF;
	
	UPDATE msg_channels_hist SET message_body = tBody WHERE message_id = iMessageId;
	
	-- достаем сессии юзеров которые сейчас сидят в канале
	SELECT array_agg(ses.sid)
	INTO aSids
	FROM msg_channel_users mcu
	LEFT JOIN sessions ses ON (ses.user_id = mcu.user_id)
	WHERE (mcu.channel_id = iChannelId);
	RAISE LOG 'aSids=%', aSids;
	
	IF (aSids IS NOT NULL) AND (coalesce(array_length(aSids, 1), 0) > 0) THEN
		
		-- готовим событие сообщения
		jEvent := json_build_object(
			'type',       'msg_channel_correct',
			'id',         iMessageId,
			'channel_id', iChannelId,
			'body',       tBody
		)::jsonb;
		RAISE LOG 'jEvent=%', jEvent;
		
		PERFORM sub_event_add(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;
	
	RETURN json_build_object(
		'corrected_message_id', iMessageId,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'channels.correct failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%, eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION channels.correct(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: create(json, json); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION "create"(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	tTitle text;
	tType text;
	tpType "channels"."tp_ch_type";
	iChannelId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'channels.create % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	
	tTitle := cm->>'title';
	tType := cm->>'type';
	IF tTitle IS NULL OR length(tTitle) < 1 THEN RETURN error(-1, 'title required'); END IF;
	IF tType IS NULL THEN RETURN error(-1, 'type required'); END IF;
	
	BEGIN tpType := tType::"channels"."tp_ch_type"; EXCEPTION WHEN OTHERS THEN RETURN error(-1, format('invalid type(%s)', tType)); END;
	
	INSERT INTO "public"."msg_channels" ("type", "title", "creator_user_id") VALUES (tpType, tTitle, iUserId);
	iChannelId := lastval();
	
	INSERT INTO "public"."msg_channel_users" ("channel_id", "user_id", "flags") VALUES (iChannelId, iUserId, "const"."msg_ch_user_flg__creator"());
	
	RETURN json_build_object(
		'created_channel_id', iChannelId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'channels.create failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION channels."create"(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: delete(json, json); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION delete(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iChannelId bigint;
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'channels.delete % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	
	iChannelId := utils__text2bigint(cm->>'channel_id');
	IF iChannelId IS NULL THEN RETURN error(-1, 'channel_id required'); END IF;
	
	PERFORM * FROM "public"."msg_channels" WHERE "channel_id" = iChannelId AND "creator_user_id" = iUserId;
	IF NOT FOUND THEN RETURN error(-1, format('channel(%s) created by user(%s) not found', iChannelId, iUserId)); END IF;
	
	-- достаем сессии юзеров которые сейчас сидят в канале
	SELECT ARRAY_AGG("sessions"."sid")
	INTO aSids
	FROM "msg_channel_users" mcu
	LEFT JOIN "sessions" ON "sessions"."user_id" = mcu."user_id"
	WHERE mcu."channel_id" = iChannelId;
	RAISE LOG 'aSids=%', aSids;
	
	IF aSids IS NOT NULL AND coalesce(array_length(aSids, 1), 0) > 0 THEN
		
		-- готовим событие сообщения
		jEvent := json_build_object(
			'type',       'msg_channel_deleted',
			'channel_id', iChannelId
		)::jsonb;
		RAISE LOG 'jEvent=%', jEvent;
		
		PERFORM sub_event_add(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;
	
	DELETE FROM "public"."msg_channels" WHERE "channel_id" = iChannelId AND "creator_user_id" = iUserId;
	
	RETURN json_build_object(
		'deleted_channel_id', iChannelId,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'channels.delete failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION channels.delete(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: erase(json, json); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION erase(cl json, cm json) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	iUserId bigint;
	iChannelId bigint;
	iMessageId bigint;
	tsCtime timestamp without time zone;
	bDeleted boolean;
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'channels.erase % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iChannelId := utils__text2bigint(cm->>'channel_id');
	iMessageId := utils__text2bigint(cm->>'message_id');
	IF (iChannelId IS NULL) THEN RETURN error(-1, 'channel_id required'); END IF;
	IF (iMessageId IS NULL) THEN RETURN error(-1, 'message_id required'); END IF;
	
	SELECT ctime, deleted INTO tsCtime, bDeleted FROM msg_channels_hist WHERE message_id = iMessageId AND channel_id = iChannelId AND user_id = iUserId;
	IF NOT FOUND THEN RETURN error(-1, format('message(%s) from user(%s) not found', iMessageId, iUserId)); END IF;
	IF bDeleted THEN RETURN error(-1, format('message(%s) already deleted', iMessageId)); END IF;
	--RAISE LOG 'tsCtime=% now=% diff=% % % %', tsCtime, utils__now_utc(), utils__now_utc() - tsCtime, (utils__now_utc() - tsCtime) > '1 min'::interval, (utils__now_utc() - tsCtime) < '100 min'::interval, (utils__now_utc() - tsCtime) > '30 min'::interval;
	
	IF (utils__now_utc() - tsCtime) > '10 min'::interval THEN RETURN error(-1, 'too late'); END IF;
	
	UPDATE msg_channels_hist SET deleted = TRUE WHERE message_id = iMessageId;
	
	-- достаем сессии юзеров которые сейчас сидят в канале
	SELECT array_agg(ses.sid)
	INTO aSids
	FROM msg_channel_users mcu
	LEFT JOIN sessions ses ON (ses.user_id = mcu.user_id)
	WHERE (mcu.channel_id = iChannelId);
	RAISE LOG 'aSids=%', aSids;
	
	IF (aSids IS NOT NULL) AND (coalesce(array_length(aSids, 1), 0) > 0) THEN
		
		-- готовим событие сообщения
		jEvent := json_build_object(
			'type',       'msg_channel_erase',
			'id',         iMessageId,
			'channel_id', iChannelId
		)::jsonb;
		RAISE LOG 'jEvent=%', jEvent;
		
		PERFORM sub_event_add(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;
	
	RETURN json_build_object(
		'erased_message_id', iMessageId,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'channels.erase failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%, eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION channels.erase(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: hist_list(json, json); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION hist_list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	iChannelId bigint;
	iChannelUserFlags bigint;
	iLastReadedMessageId bigint;
	
	-- schema
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":        {"col": "message_id",   "select": "th.message_id",             "alias": "id",       "type": "number"},
			"ts":        {"col": "ctime",        "select": "utils__ts2int(th.ctime)",   "alias": "ts",       "type": "timestamp"},
			"uid":       {"col": "user_id",      "select": "th.user_id",                "alias": "uid",      "type": "number"},
			"fn":        {"col": "first_name",   "select": "tu.first_name",             "alias": "fn",       "type": "text"},
			"ln":        {"col": "last_name",    "select": "tu.last_name",              "alias": "ln",       "type": "text"},
			"body":      {"col": "message_body", "select": "CASE WHEN NOT th.deleted THEN th.message_body ELSE NULL END",  "alias": "body",     "type": "text"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	-- ordering, pagenation
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	iLimitT bigint;
	
	-- filtering
	aFilters json[];
	jFilter json;
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	-- fetching
	c1 refcursor;
	r1 record;
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	-- error handling
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'channels.history_list % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	iChannelId := utils__text2bigint(cm->>'channel_id');
	IF iChannelId IS NULL THEN RETURN error(-1, 'channel_id required'); END IF;
	
	SELECT "lrm_id", "flags"
	INTO iLastReadedMessageId, iChannelUserFlags
	FROM "public"."msg_channel_users"
	WHERE "channel_id" = iChannelId AND "user_id" = iUserId;
	IF NOT FOUND THEN RETURN error(-1, format('user(%s) and channel(%s) relation not found', iUserId, iChannelId)); END IF;
	RAISE LOG 'iLastReadedMessageId=% iChannelUserFlags=%', iLastReadedMessageId, iChannelUserFlags;
	
	IF "utils"."flgchk"(iChannelUserFlags, "const"."msg_ch_user_flg__just_invited"()) IS TRUE THEN
		RETURN error(-1, format('user(%s) must have no flag "just_invited" for access channel(%s) history', iUserId, iChannelId));
	END IF;
	
	tOrderBy  := cm->>'orderBy';
	tDir      := cm->>'dir';
	iOffset   := utils__text2bigint(cm->>'offset');
	iLimit    := utils__text2bigint(cm->>'limit');
	
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF iLimit > 500 THEN iLimit = 500; END IF;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	IF coalesce(array_length(aFields, 1), 0) > 0 THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF jField IS NOT NULL THEN
				IF (jField->>'alias') IS NULL THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF coalesce(array_length(aSelection, 1), 0) < 1 THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF (jField->>'alias') IS NULL THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	
	BEGIN SELECT ARRAY_AGG(el) INTO aFilters FROM json_array_elements(cm->'filters') el; EXCEPTION WHEN OTHERS THEN NULL; END;
	
	IF aFilters IS NOT NULL THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			CONTINUE WHEN json_typeof(jFilter) != 'array' OR json_array_length(jFilter) != 3;
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			CONTINUE WHEN tCol IS NULL OR (jCfg->'fields'->tCol) IS NULL OR tVal IS NULL;
			tColFilter := jCfg->'fields'->tCol->>'select';
			CONTINUE WHEN tCol IS NULL;
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);  -- todo: use `like`, check dots
			ELSE
			END CASE;
		END LOOP;
	END IF;
	
	aWhere := aWhere || format('th."channel_id" = %L', iChannelId);
	/*
	IF coalesce(array_length(aWhere, 1), 0) < 1 THEN
		aWhere := aWhere || 'TRUE'::text;
	END IF;
	*/
	
	tQuery := format('
		SELECT %s
		FROM "public"."msg_channels_hist" th
		LEFT JOIN "public"."users" tu ON th."user_id" = tu."id"
		WHERE (%s)
		ORDER BY %s %s',
		array_to_string(aSelection, ', '),
		array_to_string(aWhere, ') AND ('),
		tOrderBy, tDir
	);
	RAISE LOG 'tQuery: %', tQuery;
	
	OPEN c1 FOR EXECUTE tQuery;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS iTotal = ROW_COUNT;
	RAISE LOG 'iTotal=%', iTotal;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD iOffset IN c1;
	iLimitT := iLimit;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		aResult := aResult || row_to_json(r1);
		IF iLimit <= 1 THEN EXIT; END IF;
		iLimit := iLimit - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total',  iTotal,
		'offset', iOffset,
		'limit',  iLimitT,
		'data',   array_to_json(aResult),
		'lrm_id', iLastReadedMessageId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'channels.history_list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION channels.hist_list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: invite(json, json); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION invite(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iChannelId bigint;
	iInvitedUserId bigint;
	iFlags bigint;
	sTitle text;
	sType text;
	jInviteAllowChk json;
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	-- добавление юзеров в канал по списку user_id
	
	iUserId := "utils"."txt2int8"(cl->>'user_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	
	iChannelId := "utils"."txt2int8"(cm->>'channel_id');
	iInvitedUserId := "utils"."txt2int8"(cm->>'user_id');
	IF iChannelId IS NULL THEN RETURN error(-1, 'channel_id required'); END IF;
	IF iInvitedUserId IS NULL THEN RETURN error(-1, 'user_id required'); END IF;
	
	SELECT "flags" INTO iFlags FROM "public"."msg_channel_users" WHERE "channel_id" = iChannelId AND "user_id" = iUserId;
	IF NOT FOUND THEN RETURN error(-1, format('channel(%s) and user(%s) relation not found', iChannelId, iUserId)); END IF;
	IF (iFlags & 1) = 1 THEN RETURN error(-1, format('user(%s) must have no flag(1) in channel(%s)', iUserId, iChannelId)); END IF;
	
	PERFORM * FROM "users" WHERE "id" = iInvitedUserId;
	IF NOT FOUND THEN RETURN error(-1, format('user(%s) not found', iInvitedUserId)); END IF;
	
	SELECT "title", "type" INTO sTitle, sType FROM "public"."msg_channels" WHERE "channel_id" = iChannelId;
	IF NOT FOUND THEN RETURN error(-1, format('channel(%s) not found', iChannelId)); END IF;
	
	-- проверяем настройки приватности приглашаемого
	SELECT "public"."utils__msg_channel_invite_allow_check"(iUserId, iInvitedUserId) INTO jInviteAllowChk;
	--RAISE LOG 'jInviteAllowChk=%', jInviteAllowChk;
	IF jInviteAllowChk IS NULL THEN
		RETURN error(-1, format('msg channel privacy check failed from(%s) to(%s)', iUserId, iInvitedUserId));
	ELSE
		IF (jInviteAllowChk->>'err') IS NOT NULL THEN RETURN jInviteAllowChk; END IF;
		IF (jInviteAllowChk->>'allowed') != 'true' THEN RETURN error(-1, format('msg channel privacy check failed from(%s) to(%s)', iUserId, iInvitedUserId)); END IF;
	END IF;
	
	-- flags:
	-- 1 - just invited
	-- 
	-- 
	-- 
	
	-- связываем юзера с каналом
	INSERT INTO "public"."msg_channel_users"
	("channel_id", "user_id", "flags", "lrm_id")
	VALUES
	(iChannelId, iInvitedUserId, "const"."msg_ch_user_flg__just_invited"(), (SELECT MAX("message_id") FROM "public"."msg_channels_hist" WHERE "channel_id" = iChannelId));
	/*
	INSERT INTO "public"."msg_channel_users" ("channel_id", "user_id", "flags") VALUES (iChannelId, iInvitedUserId, "const"."msg_ch_user_flg__just_invited"());
	*/
	
	-- достаем сессии получателя приглашения
	SELECT ARRAY_AGG("sid") INTO aSids FROM "public"."sessions" WHERE "user_id" = iInvitedUserId;
	--RAISE LOG 'aSids=%', aSids;
	
	IF aSids IS NOT NULL AND "utils"."len"(aSids) > 0 THEN
		
		-- готовим событие приглашения
		jEvent := json_build_object(
			'type',       'msg_channel_invite',
			'channel_id', iChannelId,
			'title',      sTitle,
			'ctype',      sType,
			'users',      (SELECT COUNT(*) FROM "public"."msg_channel_users" WHERE "channel_id" = iChannelId),
			'flags',      "const"."msg_ch_user_flg__just_invited"()
		)::jsonb;
		
		PERFORM "public"."sub_event_add"(aSids, jEvent);
		__events__ := __events__ || json_build_object(
			'sids',  aSids,
			'event', jEvent
		);
		
	END IF;
	
	-- достаем сессии юзеров которые сейчас сидят в канале (за исключением только что добавленного iInvitedUserId)
	SELECT ARRAY_AGG("ses"."sid")
	INTO aSids
	FROM "public"."msg_channel_users" "mcu"
	LEFT JOIN "public"."sessions" "ses" ON "ses"."user_id" = "mcu"."user_id"
	WHERE "mcu"."channel_id" = iChannelId AND "mcu"."user_id" != iInvitedUserId;
	--RAISE LOG 'aSids=%', aSids;
	
	IF aSids IS NOT NULL AND COALESCE(array_length(aSids, 1), 0) > 0 THEN
		
		-- готовим событие upsert юзера
		SELECT json_build_object(
			'type',       'msg_channel_user_upsert',
			'channel_id', iChannelId,
			'user_id',    "users"."id",
			'first_name', "users"."first_name",
			'last_name',  "users"."last_name",
			'comp_id',    "users"."comp_id",
			'comp_name',  "comps"."name",
			'flags',      "const"."msg_ch_user_flg__just_invited"()
		)::jsonb
		INTO jEvent
		FROM "public"."users"
		LEFT JOIN "comps" ON "comps"."id" = "users"."comp_id"
		WHERE "users"."id" = iInvitedUserId;
		--RAISE LOG 'jEvent=%', jEvent;
		
		PERFORM "public"."sub_event_add"(aSids, jEvent);
		__events__ := __events__ || json_build_object(
			'sids', aSids,
			'event', jEvent
		);
		
	END IF;
	
	RETURN json_build_object(
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		IF (SQLSTATE = '23505') AND (eConstr = 'msg_channel_users_channel_id_user_id_idx') THEN RETURN error(-1, format('user(%s) already in channel(%s)', iInvitedUserId, iChannelId)); END IF;  -- unique constraint
		RAISE LOG 'msg_channel_invite failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION channels.invite(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: join(json, json); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION "join"(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iChannelId bigint;
	tpType "channels"."tp_ch_type";
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	-- принятие приглашения в приват
	
	RAISE LOG 'channels.join % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	
	iChannelId := utils__text2bigint(cm->>'channel_id');
	IF iChannelId IS NULL THEN RETURN error(-1, 'channel_id required'); END IF;
	
	SELECT "type" INTO tpType FROM "public"."msg_channels" WHERE "channel_id" = iChannelId;
	IF NOT FOUND THEN RETURN error(-1, format('channel(%s) not found', iChannelId)); END IF;
	
	CASE tpType
		 WHEN 'group'::"channels"."tp_ch_type" THEN
			
			-- юзер должен быть приглашен
			
			UPDATE "public"."msg_channel_users" SET
				"flags" = ("flags" & ~("const"."msg_ch_user_flg__just_invited"()))  -- убираем флаг приглашенного
			WHERE "channel_id" = iChannelId AND "user_id" = iUserId;
			
			IF NOT FOUND THEN RETURN error(-1, format('channel(%s) and user(%s) relation not found', iChannelId, iUserId)); END IF;
			
		WHEN 'channel'::"channels"."tp_ch_type" THEN
			
			-- юзер может быть приглашен, или он сам зашел в канал
			
			-- пробуем погасть приглашение
			UPDATE "public"."msg_channel_users" SET
				"flags" = ("flags" & ~("const"."msg_ch_user_flg__just_invited"()))  -- убираем флаг приглашенного
			WHERE "channel_id" = iChannelId AND "user_id" = iUserId;
			
			IF NOT FOUND THEN
				-- приглашения не было, пробуем добавить юзера в канал
				
				BEGIN
					INSERT INTO "public"."msg_channel_users" ("channel_id", "user_id", "lrm_id", "unreaded") VALUES (
						iChannelId,
						iUserId,
						(SELECT MAX("message_id") FROM "public"."msg_channels_hist" WHERE "channel_id" = iChannelId),  -- последнее прочитанное делаем равным смому последнему сообщению в этом канале
						0  -- непрочитанных сообщений "ноль"
					);
				EXCEPTION
					WHEN OTHERS THEN
						IF SQLSTATE = '23505' THEN RETURN error(-1, format('channel(%s) and user(%s) relation already exists', iChannelId, iUserId)); END IF; -- dubicate
						RAISE;  -- толкаем ошибку дальше
				END;
				
			END IF;
			
	ELSE
		RETURN error(-1, format('unhandled channel type(%s)', tpType));
	END CASE;
	
	-- достаем сессии юзеров которые сейчас сидят в канале
	SELECT ARRAY_AGG("ses"."sid")
	INTO aSids
	FROM "public"."msg_channel_users" "mcu"
	LEFT JOIN "sessions" "ses" ON "ses"."user_id" = "mcu"."user_id"
	WHERE "mcu"."channel_id" = iChannelId;
	--RAISE LOG 'aSids=%', aSids;
	
	IF aSids IS NOT NULL AND COALESCE(array_length(aSids, 1), 0) > 0 THEN
		
		-- готовим событие upsert юзера
		SELECT json_build_object(
			'type',       'msg_channel_user_upsert',
			'channel_id', iChannelId,
			'user_id',    iUserId,
			'first_name', "users"."first_name",
			'last_name',  "users"."last_name",
			'comp_id',    "users"."comp_id",
			'comp_name',  "comps"."name",
			'flags',      "mcu"."flags"
		)::jsonb
		INTO jEvent
		FROM "public"."users"
		LEFT JOIN "public"."msg_channel_users" "mcu" ON "mcu"."channel_id" = iChannelId AND "mcu"."user_id" = "users"."id"
		LEFT JOIN "public"."comps" ON "comps"."id" = "users"."comp_id"
		WHERE "users"."id" = iUserId;
		--RAISE LOG 'jEvent=%', jEvent;
		
		PERFORM "public"."sub_event_add"(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;
	
	RETURN json_build_object(
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'msg_channel_join failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION channels."join"(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: list(json, json); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	t_type text;
	b_self boolean;
	tp_type "channels"."tp_ch_type";
	
	a_selection text[]  = ARRAY[]::text[];
	j_cfg json = '{
		"default_field": "id",
		"fields": {
			"id":        {"select": "ch.channel_id",  "alias": "id",        "type": "number"},
			"title":     {"select": "ch.title",                             "type": "text"},
			"unreaded":  {"select": "cu.unreaded",                          "type": "number"},
			"lrm":       {"select": "cu.lrm_id",      "alias": "lrm",       "type": "number"},
			"flags":     {"select": "cu.flags",                             "type": "number"},
			"comp_id":   {"select": "co.id",          "alias": "comp_id",   "type": "number"},
			"comp_name": {"select": "co.name",        "alias": "comp_name", "type": "text"},
			"users":     {"select": "ch.users",                             "type": "number"},
			"vehicles":  {"select": "0",                    "alias": "vehicles",  "type": "number"},
			"orders":    {"select": "lp.opened_orders_cnt", "alias": "orders",    "type": "number"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset BIGINT;
	iLimit BIGINT;
	iLimit2 BIGINT;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i BIGINT;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal BIGINT;
	fVal double precision;
	
	c1 refcursor;
	r1 record;
	iTotal BIGINT;
	tQuery text;
	oRec record;
	aResult json[];
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'channels.list % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	t_type := cm->>'type';
	b_self := "utils"."txt2bool"(cm->>'self');
	IF t_type IS NULL THEN RETURN error(-1, 'type required'); END IF;
	IF b_self IS NULL THEN RETURN error(-1, 'self required'); END IF;
	BEGIN tp_type := t_type::"channels"."tp_ch_type"; EXCEPTION WHEN OTHERS THEN RETURN error(-1, format('invalid type(%s)', t_type)); END;
	IF tp_type = 'group'::"channels"."tp_ch_type" AND b_self IS NOT TRUE THEN RETURN error(-1, format('incompatible type(%s) and self(%s)', t_type, b_self)); END IF;
	
	tOrderBy  := cm->>'orderBy';
	tDir      := cm->>'dir';
	iOffset   := cm->>'offset';
	iLimit    := cm->>'limit';
	
	IF tOrderBy IS NULL OR (j_cfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = j_cfg->'fields'->(j_cfg->>'default_field')->>'select';
	ELSE
		tOrderBy = j_cfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF iLimit > 500 THEN iLimit = 500; END IF;
	iLimit2 := iLimit;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	--RAISE LOG 'aFields=% len=%', aFields, array_length(aFields, 1);
	IF COALESCE(array_length(aFields, 1), 0) > 0 THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := j_cfg->'fields'->tField;
			IF jField IS NOT NULL THEN
				IF (jField->>'alias') IS NULL THEN
					a_selection := a_selection || (jField->>'select');
				ELSE
					a_selection := a_selection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF COALESCE(array_length(a_selection, 1), 0) < 1 THEN
		jField := j_cfg->'fields'->(j_cfg->>'default_field');
		IF (jField->>'alias') IS NULL THEN
			a_selection := a_selection || (jField->>'select');
		ELSE
			a_selection := a_selection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	RAISE LOG 'a_selection=%', a_selection;
	
	BEGIN
		SELECT ARRAY_AGG(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN OTHERS THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF aFilters IS NOT NULL THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			CONTINUE WHEN json_typeof(jFilter) != 'array' OR json_array_length(jFilter) != 3;
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			CONTINUE WHEN tCol IS NULL OR (j_cfg->'fields'->tCol) IS NULL OR tVal IS NULL;
			tColFilter := j_cfg->'fields'->tCol->>'select';
			CONTINUE WHEN tCol IS NULL;
			
			CASE j_cfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := "utils"."txt2float8"(tVal);
					CONTINUE WHEN fVal IS NULL;
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := "utils"."txt2int8"(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	aWhere := aWhere || format('ch.type = %L', tp_type);
	
	IF b_self IS TRUE THEN
		
		aWhere := aWhere || format('"cu"."user_id" = %L', i_user_id);
		
		tQuery := format('
			SELECT %s
			FROM "public"."msg_channel_users" "cu"
			LEFT JOIN "public"."msg_channels" "ch" ON "ch"."channel_id" = "cu"."channel_id"
			LEFT JOIN "public"."users" "u" ON  "u"."id" = "cu"."user_id"
			LEFT JOIN "public"."comps" "co" ON "co"."id" = "u"."comp_id"
			LEFT JOIN "lplace"."lplaces" "lp" ON "lp"."channel_id" = "ch"."channel_id"
			WHERE (%s)
			ORDER BY %s %s',
			array_to_string(a_selection, ', '),
			array_to_string(aWhere, ') AND ('),
			tOrderBy, tDir
		);
	
	ELSE
		
		--IF "utils"."len"(aWhere) < 1 THEN aWhere := aWhere || 'TRUE'::text; END IF;
		
		tQuery := format('
			SELECT %s
			FROM "public"."msg_channels" "ch"
			LEFT JOIN "public"."msg_channel_users" "cu" ON "cu"."user_id" = %L AND "cu"."channel_id" = "ch"."channel_id"
			LEFT JOIN "public"."users" "u" ON "u"."id" = "cu"."user_id"
			LEFT JOIN "public"."comps" "co" ON "co"."id" = "u"."comp_id"
			LEFT JOIN "lplace"."lplaces" "lp" ON "lp"."channel_id" = "ch"."channel_id"
			WHERE (%s)
			ORDER BY %s %s',
			array_to_string(a_selection, ', '),
			i_user_id,
			array_to_string(aWhere, ') AND ('),
			tOrderBy, tDir
		);
		
	END IF;
	
	RAISE LOG 'tQuery: %', tQuery;
	
	OPEN c1 FOR EXECUTE tQuery;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS iTotal = ROW_COUNT;
	RAISE LOG 'iTotal=%', iTotal;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD iOffset IN c1;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		aResult := aResult || row_to_json(r1);
		IF iLimit2 <= 1 THEN EXIT; END IF;
		iLimit2 := iLimit2 - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total',  iTotal,
		'offset', iOffset,
		'limit',  iLimit,
		'data',   array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'channels.list failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION channels.list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: readed(json, json); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION readed(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iChannelId bigint;
	iMessageId bigint;
	iChannelUserId bigint;
	iChannelUserFlags bigint;
	iUnreaded bigint;
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'channels.readed % %', cl, cm;
	
	iUserId := "utils"."txt2int8"(cl->>'user_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	
	iChannelId := "utils"."txt2int8"(cm->>'channel_id');
	iMessageId := "utils"."txt2int8"(cm->>'message_id');
	IF iChannelId IS NULL THEN RETURN error(-1, 'channel_id required'); END IF;
	IF iMessageId IS NULL THEN RETURN error(-1, 'message_id required'); END IF;
	
	SELECT "channel_user_id", "flags" INTO iChannelUserId, iChannelUserFlags FROM "public"."msg_channel_users" WHERE "channel_id" = iChannelId AND "user_id" = iUserId;
	IF NOT FOUND THEN RETURN error(-1, format('user(%s) and channel(%s) relation not found', iUserId, iChannelId)); END IF;
	
	IF "utils"."flgchk"(iChannelUserFlags, "const"."msg_ch_user_flg__just_invited"()) IS TRUE THEN
		RETURN error(-1, format('user(%s) must have no flag "just_invited" for send in channel(%s)', iUserId, iChannelId));
	END IF;
	
	IF iMessageId IS NULL THEN  -- все непрочитано
		
		SELECT COUNT(*) INTO iUnreaded FROM "public"."msg_channels_hist" WHERE "channel_id" = iChannelId AND "user_id" != iUserId;
		
	ELSE  -- непрочитано конкретное сообщение
		
		PERFORM "message_id" FROM "public"."msg_channels_hist" WHERE "channel_id" = iChannelId AND "message_id" = iMessageId;
		IF NOT FOUND THEN RETURN error(-1, format('messsage(%s) not found in channel(%s)', iMessageId, iChannelId)); END IF;
		SELECT COUNT(*) INTO iUnreaded FROM "msg_channels_hist" WHERE "channel_id" = iChannelId AND "user_id" != iUserId AND "message_id" > iMessageId;
		
	END IF;
	
	UPDATE "public"."msg_channel_users" SET "lrm_id" = iMessageId, "unreaded" = iUnreaded WHERE "channel_user_id" = iChannelUserId;
	
	--RAISE LOG 'iUnreaded=%', iUnreaded;
	
	SELECT ARRAY_AGG(sid) INTO aSids FROM "sessions" WHERE "user_id" = iUserId;
	--RAISE LOG 'aSids=%', aSids;
	
	IF aSids IS NOT NULL AND COALESCE(array_length(aSids, 1), 0) > 0 THEN
		
		jEvent := json_build_object(
			'type',        'msg_channel_unreaded',
			'channel_id',  iChannelId,
			'unreaded',    iUnreaded,
			'lrm_id',      iMessageId
		)::jsonb;
		
		PERFORM sub_event_add(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;
	
	RETURN json_build_object(
		'channel_id', iChannelId,
		'unreaded',   iUnreaded,
		'lrm_id',     iMessageId,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'msg_channel_readed failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION channels.readed(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: trigger_msg_channel_users_change(); Type: FUNCTION; Schema: channels; Owner: cargochat_u
--

CREATE FUNCTION trigger_msg_channel_users_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	--RAISE LOG 'trigger_msg_channel_users_change: % % %', TG_WHEN, TG_OP, TG_RELNAME;
	--RAISE LOG 'OLD=% NEW=%', OLD, NEW;
	-- trigger_vehicles_files_checker: AFTER INSERT price_request_bets (17,"2015-08-26 03:12:05.644307",12,100,1,281)
	
	CASE (TG_OP)
		
		WHEN 'INSERT' THEN
			--RAISE LOG 'INSERT new=%', NEW;
			-- INSERT new=(4,185,,161,0,0)
			UPDATE msg_channels SET users = (SELECT count(*) FROM msg_channel_users WHERE (channel_id = NEW.channel_id)) WHERE channel_id = NEW.channel_id;
			RETURN NEW;
		WHEN 'UPDATE' THEN
			--RAISE LOG 'UPDATE old=% new=%', OLD, NEW;
			IF (OLD.channel_id != NEW.channel_id) THEN
				UPDATE msg_channels SET users = (SELECT count(*) FROM msg_channel_users WHERE (channel_id = NEW.channel_id)) WHERE channel_id = NEW.channel_id;
				UPDATE msg_channels SET users = (SELECT count(*) FROM msg_channel_users WHERE (channel_id = OLD.channel_id)) WHERE channel_id = OLD.channel_id;
			END IF;
			RETURN NEW;
		ELSE
			--RAISE LOG 'DELETE old=%', OLD;
			UPDATE msg_channels SET users = (SELECT count(*) FROM msg_channel_users WHERE (channel_id = OLD.channel_id)) WHERE channel_id = OLD.channel_id;
			RETURN OLD;
	END CASE;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'trigger_msg_channel_users_change failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		--CASE (TG_OP)
		--	WHEN 'INSERT' THEN RETURN NEW;
		--	WHEN 'UPDATE' THEN RETURN OLD;
		--	ELSE RETURN OLD;
		--END CASE;
		RAISE;
END;
$$;


ALTER FUNCTION channels.trigger_msg_channel_users_change() OWNER TO cargochat_u;

SET search_path = common, pg_catalog;

--
-- Name: empty(json); Type: FUNCTION; Schema: common; Owner: cargochat_u
--

CREATE FUNCTION empty(o_params json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
begin

 return '{"err":0}';
end;
$$;


ALTER FUNCTION common.empty(o_params json) OWNER TO cargochat_u;

--
-- Name: main(character varying); Type: FUNCTION; Schema: common; Owner: cargochat_u
--

CREATE FUNCTION main(c_params character varying) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
 o_params json;
 i_res bigint;
 o_res json;
 c_command character varying;
 c_function character varying;
begin

 o_params := c_params::json;

 --i_res := stat.log_add(o_params);

 c_command := o_params->>'cm';
 if (c_command is null) then
  return '{"err": -1010, "msg": "cm is absent."}'::json;
 end if;

 select cparams[1] into c_function from common.commands where (cm_name = c_command);
 if (c_function is null) then
  return ('{"err": -1010, "msg": ' || to_json('unknown cm. (' || c_params || ')') || '}')::json;
 end if;

 execute c_function into o_res using o_params;
 return o_res;
exception
 when others then
  return ('{"err": -1000, "msg": "see SQLSTATE, SQLERRM.", "SQLSTATE": ' || to_json(SQLSTATE) || ', "SQLERRM": ' || to_json(SQLERRM) || '}')::json;
end;
$$;


ALTER FUNCTION common.main(c_params character varying) OWNER TO cargochat_u;

--
-- Name: user_position_change(json); Type: FUNCTION; Schema: common; Owner: cargochat_u
--

CREATE FUNCTION user_position_change(o_params json) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
 i_res bigint;
 i_user_id_ses bigint;
 i_user_id bigint;
 i_comp_id_ses bigint;
 i_comp_id bigint;
 i_comp_flags bigint;
 c_position character varying;
begin

 i_user_id := (o_params->>'user_id')::bigint;
 c_position := o_params->>'position';

 select user_id into i_user_id_ses from sessions where (sid = o_params->>'sid');
 if (i_user_id_ses is null) then
  return '{"err": -1, "msg": "session error."}'::json;
 end if;

 select comp_id, comp_flags into i_comp_id_ses, i_comp_flags from users where (id = i_user_id_ses);
 if (i_comp_id_ses is null) then
  return '{"err": -1, "msg": "comp_id_ses error."}'::json;
 end if;

 if ((i_comp_flags & 1) = 0) then
  return '{"err": -2, "msg": "rights error."}'::json;
 end if;

 select comp_id into i_comp_id from users where (id = i_user_id);
 if (i_comp_id is null) then
  return '{"err": -1, "msg": "comp_id error."}'::json;
 end if;

 if (i_comp_id <> i_comp_id_ses) then
  return '{"err": -3, "msg": "i_comp_id <> i_comp_id_ses."}'::json;
 end if;

 raise notice '1';

 update users set
  position = c_position
 where (id = i_user_id);

 raise notice '2';

 return '{"err":0}';
end;
$$;


ALTER FUNCTION common.user_position_change(o_params json) OWNER TO cargochat_u;

SET search_path = comp, pg_catalog;

--
-- Name: check(json, text); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION "check"(cm json, t_ipaddr text) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	jDadata json;
	--tKPP text;
	--oRec record;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	jDadata := cm->'dadata';
	IF jDadata IS NULL THEN RETURN error(-1010, 'dadata required'); END IF;
	
	--tKPP := coalesce(jDadata#>>'{data,kpp}', 'none');
	
	BEGIN
		INSERT INTO dadata_opf ("code", "full", "short") VALUES (jDadata#>>'{data,opf,code}', jDadata#>>'{data,opf,full}', jDadata#>>'{data,opf,short}');
	EXCEPTION
		WHEN others THEN NULL;
	END;
	
	iCompId := -1;
	
	BEGIN
		INSERT INTO "comps" ("name", "inn", "kpp", "addr", "ogrn", "opf", "x", "y", "ymap", "dadata", "j_doc")
		VALUES (
			jDadata#>>'{value}',
			jDadata#>>'{data,inn}',
			jDadata#>>'{data,kpp}',
			jDadata#>>'{data,address,value}',
			jDadata#>>'{data,ogrn}',
			jDadata#>>'{data,opf,code}',
			utils__text2float(cm->>'x'),
			utils__text2float(cm->>'y'),
			(cm->'ymap')::jsonb,
			(jDadata)::jsonb,
			(cm->'j_doc')::jsonb
		);
		iCompId := lastval();
		--RAISE LOG 'iCompId=%', iCompId;
	EXCEPTION
		WHEN others THEN
			RAISE LOG 'insert into comps failed: %', SQLSTATE;
			IF eConstraint = 'comps_inn_kpp_addr_key' THEN
				RETURN error(-4, 'unique_violation: inn + kpp + addr');
			END IF;
	END;
	
	IF iCompId = -1 THEN
		SELECT id INTO iCompId FROM comps WHERE inn = jDadata#>>'{data,inn}' AND kpp = jDadata#>>'{data,kpp}' AND addr = jDadata#>>'{data,address,value}';
		IF NOT FOUND THEN RETURN error(-2000, 'comp not found'); END IF;
	END IF;
	
	--SELECT * FROM comps INTO oRec WHERE (id = iCompId);
	--RETURN json_build_object('comp_id', iCompId);
	--RETURN row_to_json(oRec);
	--RETURN graph(('{"query":{"comps":{"filters":[["id","eq",' || iCompId || ']],"sub":{"comp_tags":{}}}}}')::json);
	RETURN "comp"."get"(
		json_build_object(
			'inn',  jDadata#>>'{data,inn}',
			'kpp',  jDadata#>>'{data,kpp}',
			'addr', jDadata#>>'{data,address,value}'
		)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'comp_create failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		--IF eConstraint = 'comps_inn_kpp_addr_key' THEN RETURN error(-4, 'unique_violation: inn + kpp + addr'); END IF;  -- unique_violation
		IF eTable = 'comps' THEN
			IF SQLSTATE = '23502' AND eCol = 'inn' THEN RETURN error(-1, 'inn required'); END IF;  -- not_null_violation
			IF SQLSTATE = '23502' AND eCol = 'ogrn' THEN RETURN error(-5, 'ogrn required'); END IF;  -- not_null_violation
		END IF;
		IF eConstraint = 'comps_opf_fkey' THEN RETURN error(-7, 'invalid opf'); END IF;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp."check"(cm json, t_ipaddr text) OWNER TO cargochat_u;

--
-- Name: get(json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION get(j_inn_kpp_addr json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tINN text;
	tKPP text;
	tAddr text;
	
	oComp record;
	jComp json;
	
	iCntTradeFrom bigint;
	iCntTradeTo bigint;
	iCntTransportFrom bigint;
	iCntTransportTo bigint;
	
	aTags text[];
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	tINN  := j_inn_kpp_addr->>'inn';
	tKPP  := j_inn_kpp_addr->>'kpp';
	tAddr := j_inn_kpp_addr->>'addr';
	
	IF tINN IS NULL THEN RETURN error(-2000, 'inn required'); END IF;
	IF tAddr IS NULL THEN RETURN error(-2000, 'addr required'); END IF;
	
	IF tKPP IS NOT NULL THEN
		SELECT * FROM "public"."comps" INTO oComp WHERE "inn" = tINN AND "kpp" = tKPP AND "addr" = tAddr;
	ELSE
		SELECT * FROM "public"."comps" INTO oComp WHERE "inn" = tINN AND "addr" = tAddr AND "kpp" IS NULL;
	END IF;
	IF NOT FOUND THEN RETURN error(-2000, format('comp(%s) not found', tINN)); END IF;
	jComp := row_to_json(oComp);
	
	-- tags
	SELECT COALESCE(ARRAY_AGG(tag), '{}') INTO aTags FROM "comp_tags" WHERE "comp_id" = oComp."id";
	
	-- sum(transport to)
	-- sum(transport from)
	-- sum(trade to)
	-- sum(trade from)
	
	--SELECT COUNT(*) INTO iCntTradeFrom     FROM comp_relations WHERE (relation_type = 'trade'::"comp"."tp_comp_relation_type")     AND (comp_from = oComp.id);
	--SELECT COUNT(*) INTO iCntTradeTo       FROM comp_relations WHERE (relation_type = 'trade'::"comp"."tp_comp_relation_type")     AND (comp_to   = oComp.id);
	iCntTradeFrom := 0;
	iCntTradeTo := 0;
	SELECT COUNT(*) INTO iCntTransportFrom FROM "public"."comp_relations" WHERE "relation_type" = 'transport'::"comp"."tp_comp_relation_type" AND "comp_from" = oComp."id";
	SELECT COUNT(*) INTO iCntTransportTo   FROM "public"."comp_relations" WHERE "relation_type" = 'transport'::"comp"."tp_comp_relation_type" AND "comp_to"   = oComp."id";
	
	jComp := utils__j_merge(
		jComp,
		json_build_object(
			'tags',                   aTags,
			'rel_trade_from_cnt',     iCntTradeFrom,
			'rel_trade_to_cnt',       iCntTradeTo,
			'rel_transport_from_cnt', iCntTransportFrom,
			'rel_transport_to_cnt',   iCntTransportTo
		)
	);
	
	RETURN jComp;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'comp_get failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		RETURN error(-2000, format('comp_get: unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.get(j_inn_kpp_addr json) OWNER TO cargochat_u;

--
-- Name: invite_accept(json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION invite_accept(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tToken text;
	tPassw text;
	tPasswHash text;
	iSMScode bigint;
	tLastName text;
	tFirstName text;
	tPatName text;
	
	oRec record;
	oRequestRec record;
	tSid text;
	iUserId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'comp.invite_accept';
	
	tToken = cm->>'token';
	tPassw = cm->>'passw';
	tLastName = cm->>'last_name';
	tFirstName = cm->>'first_name';
	tPatName = cm->>'pat_name';
	iSMScode = utils__text2bigint(cm->>'sms_code');
	
	IF tToken IS NULL THEN RETURN error(-1, 'token required'); END IF;
	IF tLastName IS NULL THEN RETURN error(-1, 'last_name required'); END IF;
	IF tFirstName IS NULL THEN RETURN error(-1, 'first_name required'); END IF;
	IF tPatName IS NULL THEN RETURN error(-1, 'pat_name required'); END IF;
	IF tPassw IS NULL THEN RETURN error(-2, 'passw required'); END IF;
	IF iSMScode IS NULL THEN RETURN error(-2, 'sms_code required'); END IF;
	tPasswHash := md5(get_const('salt_passw') || tPassw);
	
	SELECT "invite_id", "comp_id", "email", "phone" INTO oRec FROM "comp"."invites" WHERE "token" = tToken;
	IF NOT FOUND THEN RETURN error(-3, 'invalid token'); END IF;
	RAISE LOG 'comp.invite_accept %', oRec;
	
	-- создаем юзера
	BEGIN
		INSERT INTO "users" ("last_name", "first_name", "pat_name", "email", "comp_id", "comp_flags", "mobile")
			VALUES (tLastName, tFirstName, tPatName, oRec.email, oRec.comp_id, const.user_comp_perm__unlim(), oRec.phone)
			RETURNING "id" INTO iUserId;
		INSERT INTO "users_auths" ("user_id", "type", "key", "secret")
			VALUES (iUserId, 'email_passw', oRec.email, tPasswHash);
	EXCEPTION
		WHEN others THEN
			GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
			RAISE LOG 'comp.invite_accept failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
			RETURN error(-2000, format('user creating failed %s', SQLSTATE));
	END;
	
	-- создаем связь (если она была в инвайте)
	SELECT "comp_relation_request_id", "relation_type", "comp_from", "comp_to" INTO oRequestRec FROM "comp_relation_requests" WHERE "comp_invite_id" = oRec.invite_id;
	IF oRequestRec IS NOT NULL THEN
		RAISE LOG 'oRequestRec=%', oRequestRec;
		INSERT INTO "comp_relations" ("relation_type", "comp_from", "comp_to") VALUES (oRequestRec.relation_type, oRequestRec.comp_from, oRequestRec.comp_to);
		DELETE FROM "comp_relation_requests" WHERE "comp_relation_request_id" = oRequestRec.comp_relation_request_id;
	END IF;
	
	--INSERT INTO perms (user_id, comp_id, perm_type) VALUES (iUserId, oRec.comp_id, get_perm('unlimited'));
	UPDATE "comps" SET "state" = ('owned'::"comp"."tp_comp_state") WHERE "id" = oRec.comp_id;
	DELETE FROM "comp"."invites" WHERE "invite_id" = oRec.invite_id;
	
	--RETURN json_build_object('sid', tSid, 'user_id', iUserId);
	RETURN "user"."login"(
		json_build_object(
			'email', oRec.email,
			'passw', tPassw
		),
		TRUE
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'comp.invite_accept failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.invite_accept(cm json) OWNER TO cargochat_u;

--
-- Name: invite_create(json, json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION invite_create(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	
	jResult json;
	
	eTable text;
	eCol text;
	eDetail text;
	
BEGIN
	
	iUserId := utils__text2bigint(cl->>'user_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	
	IF (user_perm_test(iUserId, 'unlimited') IS NOT TRUE) THEN RETURN error(-10, format('no perms, user(%s)', iUserId)); END IF;
	
	jResult := sub_comp_invite_create(json_build_object(
		'comp_id',    cm->>'comp_id',
		'last_name',  cm->>'last_name',
		'first_name', cm->>'first_name',
		'pat_name',   cm->>'pat_name',
		'email',      cm->>'email',
		'phone',      cm->>'phone'
	));
	
	IF jResult IS NULL THEN RETURN error(-2000, 'sub_comp_invite_create failed'); END IF;
	RETURN jResult;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'comp.invite_create failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.invite_create(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: invite_get(json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION invite_get(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tToken text;
	jData json;
	
	eTable text;
	eCol text;
	eConstraint text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'comp.invite_get %', cm;
	
	tToken = cm->>'token';
	IF tToken IS NULL THEN RETURN error(-1, 'token required'); END IF;
	
	SELECT json_build_object(
		'invite_id',  "invite_id",
		'ctime',      "public".utils__ts2int("ctime"),
		'comp_id',    "comp_id",
		'comp_name',  (SELECT "name" from "public"."comps" WHERE "id" = "comp"."invites"."comp_id"),
		'email',      "email",
		'phone',      "phone",
		'first_name', "first_name",
		'pat_name',   "pat_name",
		'last_name',  "last_name"
	)
	INTO jData
	FROM "comp"."invites"
	WHERE "token" = tToken;
	IF NOT FOUND THEN RETURN error(-3, 'invalid token'); END IF;
	
	RETURN jData;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eConstraint = CONSTRAINT_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'user.invite_get failed: SQLSTATE=% table="%" col="%" eConstraint="%" detail="%" SQLERRM="%" eStack="%"', SQLSTATE, eTable, eCol, eConstraint, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.invite_get(cm json) OWNER TO cargochat_u;

--
-- Name: invite_sms(json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION invite_sms(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tToken text;
	tPhoneSrc text;
	tPhoneNum text;
	iInviteId bigint;
	tsSMStime timestamp without time zone;
	cooldown_absolute bigint = 60;
	cooldown bigint = 0;
	__code__ bigint;
	
	eTable text;
	eCol text;
	eConstraint text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'comp.invite_sms %', cm;
	
	tToken = cm->>'token';
	tPhoneSrc = cm->>'phone';
	IF tToken IS NULL THEN RETURN error(-1, 'token required'); END IF;
	IF tPhoneSrc IS NULL THEN RETURN error(-1, 'phone required'); END IF;
	
	SELECT array_to_string(ARRAY(SELECT SUBSTRING(regexp_matches(tPhoneSrc, '(\d)', 'g')::text FROM 2 FOR 1)), '') INTO tPhoneNum;
	IF tPhoneNum IS NULL OR length(tPhoneNum) != 11 THEN RETURN error(-1, 'invalid phone'); END IF;
	
	SELECT "invite_id", "smstime"
	INTO iInviteId, tsSMStime
	FROM "comp"."invites"
	WHERE "token" = tToken;
	IF NOT FOUND THEN RETURN error(-3, 'invalid token'); END IF;
	
	IF tsSMStime IS NOT NULL THEN
		cooldown := cooldown_absolute - EXTRACT(EPOCH FROM utils__now_utc() - tsSMStime)::int;
		IF cooldown > 0 THEN
			RETURN json_build_object('cooldown', cooldown);
		END IF;
	END IF;
	
	__code__ := floor(random()*899999)+100000;
	
	UPDATE "comp"."invites" SET
		"phone" = tPhoneNum,
		"smstime" = utils__now_utc(),
		"smscode" = __code__
	WHERE
		"invite_id" = iInviteId;
	
	RETURN json_build_object(
		'phone', tPhoneNum,
		'cooldown', cooldown_absolute,
		'__code__', __code__
	);
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eConstraint = CONSTRAINT_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'comp.invite_sms failed: SQLSTATE=% table="%" col="%" eConstraint="%" detail="%" SQLERRM="%" eStack="%"', SQLSTATE, eTable, eCol, eConstraint, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.invite_sms(cm json) OWNER TO cargochat_u;

--
-- Name: invites_list(json, json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION invites_list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":                {"col":"user_invite_id",       "select": "iv.user_invite_id", "alias": "id",           "type": "number"},
			"ctime":             {"col":"ctime",                "select": "utils__ts2int(iv.ctime) ctime",              "type": "timestamp"},
			"email":             {"col":"email",                "select": "iv.email",                                   "type": "text"},
			"first_name":        {"col":"first_name",           "select": "iv.first_name",                              "type": "text"},
			"last_name":         {"col":"last_name",            "select": "iv.last_name",                               "type": "text"},
			"pat_name":          {"col":"pat_name",             "select": "iv.pat_name",                                "type": "text"},
			"position":          {"col":"position",             "select": "iv.position",                                "type": "text"},
			"phone":             {"col":"phone",                "select": "iv.phone",                                   "type": "text"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	aKeys bigint[];
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'comp.invites_list % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	
	--IF (tOrderBy IS NULL) OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN tOrderBy = jCfg->>'default_field'; END IF;
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF iLimit > 500 THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	--RAISE LOG 'aFields=% len=%', aFields, array_length(aFields, 1);
	IF (coalesce(array_length(aFields, 1), 0) > 0) THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF (jField IS NOT NULL) THEN
				IF ((jField->>'alias') IS NULL) THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF (coalesce(array_length(aSelection, 1), 0) < 1) THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF ((jField->>'alias') IS NULL) THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	--RAISE LOG 'aSelection=%', aSelection;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF (aFilters IS NOT NULL) THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			--CONTINUE WHEN (json_typeof(jFilter) != 'object');
			CONTINUE WHEN (json_typeof(jFilter) != 'array') OR (json_array_length(jFilter) != 3);
			--RAISE LOG 'json_array_length=%', json_array_length(jFilter);
			--RAISE LOG 'json_array: col=% op=% val=%', jFilter->>0, jFilter->>1, jFilter->>2;
			
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			--RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			tColFilter := jCfg->'fields'->tCol->>'select';
			--RAISE LOG 'tColFilter=%', tColFilter;
			CONTINUE WHEN (tCol IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('utils__ts2int(%I) < %L', tCol, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('utils__ts2int(%I) > %L', tCol, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('utils__ts2int(%I) = %L', tCol, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	-- FILTERING into INDEX ARRAY
	aWhere := aWhere || format('iv."comp_id" = %L', iCompId);
	tQuery := format('
		SELECT COALESCE(ARRAY_AGG(iv."user_invite_id"), ARRAY[]::bigint[])
		FROM "user"."invites" iv
		WHERE (%s)',
		array_to_string(aWhere, ') AND (')
	);
	
	RAISE LOG 'tQuery: %', tQuery;
	EXECUTE tQuery INTO aKeys;
	iTotal := coalesce(array_length(aKeys, 1), 0);
	RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
	
	-- ORDERING & PAGENATION
	aResult := ARRAY[]::json[];
	IF iTotal > 0 THEN
		tQuery := format('
			SELECT ARRAY_AGG(ROW_TO_JSON(__row)) FROM (
				SELECT %s
				FROM UNNEST(ARRAY[%s]) __id
				LEFT JOIN "user"."invites" iv ON __id = iv."user_invite_id"
				ORDER BY %s %s OFFSET %L LIMIT %L
			) __row',
			array_to_string(aSelection, ', '),
			array_to_string(aKeys, ', '),
			tOrderBy, tDir, iOffset, iLimit
		);
		RAISE LOG 'tQuery: %', tQuery;
		EXECUTE tQuery INTO aResult;
	END IF;
	
	RETURN json_build_object(
		'total', iTotal,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'comp.invites_list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.invites_list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: rel_list(json, json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION rel_list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	--tSourceTable text = '"lead"."registered"';
	
	iSelfCompId bigint;
	iTragetCompId bigint;
	tRelation text;
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "relation_id",
		"fields": {
			"relation_id":  {"col": "relation_id",  "select": "r.relation_id",                               "type": "number"},
			"comp_id":      {"col": "comp_id",      "select": "c.id",              "alias": "comp_id",       "type": "number"},
			"name":         {"col": "name",         "select": "c.name",                                      "type": "text"},
			"addr":         {"col": "addr",         "select": "c.addr",                                      "type": "text"},
			"inn":          {"col": "inn",          "select": "c.inn",                                       "type": "text"},
			"kpp":          {"col": "kpp",          "select": "c.kpp",                                       "type": "text"},
			"ogrn":         {"col": "ogrn",         "select": "c.ogrn",                                      "type": "text"},
			"opf":          {"col": "opf",          "select": "c.opf",                                       "type": "text"},
			"phone":        {"col": "phone",        "select": "c.phone",                                     "type": "text"},
			"email":        {"col": "email",        "select": "c.email",                                     "type": "text"},
			"taxation":     {"col": "taxation",     "select": "c.taxation",                                  "type": "text"},
			"web_site":     {"col": "web_site",     "select": "c.web_site",                                  "type": "text"},
			"tags":         {"col": "tags",         "select": "coalesce((SELECT ARRAY_AGG(tag) FROM comp_tags t WHERE t.comp_id = c.id), ARRAY[]::comp.tp_comp_tag[])",  "alias": "tags",  "type": "list"},
			"x":            {"col": "x",            "select": "c.x",                                         "type": "number"},
			"y":            {"col": "y",            "select": "c.y",                                         "type": "number"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	aWhere1 text[] = ARRAY[]::text[];
	aWhere2 text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	tagVal "comp"."tp_comp_tag";
	
	aKeys bigint[];
	aKeys2 bigint[];
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG '------------------------------------------------------------------';
	RAISE LOG 'rel_list % %', cl, cm;
	
	iSelfCompId := utils__text2bigint(cl->>'comp_id');
	iTragetCompId := utils__text2bigint(cm->>'comp_id');
	tRelation := cm->>'relation';
	IF iSelfCompId IS NULL THEN RETURN error(-1, 'you must have comp'); END IF;
	IF iTragetCompId IS NULL THEN RETURN error(-1, 'comp_id required'); END IF;
	IF tRelation IS NULL THEN RETURN error(-1, 'relation required'); END IF;
	RAISE LOG 'iSelfCompId=% iTragetCompId=%', iSelfCompId, iTragetCompId;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	
	--IF (tOrderBy IS NULL) OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN tOrderBy = jCfg->>'default_field'; END IF;
	IF (tOrderBy IS NULL) OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF (tDir IS NULL) OR (NOT (tDir = ANY(ARRAY['ASC','DESC']))) THEN tDir := 'ASC'; END IF;
	IF (iOffset IS NULL) THEN iOffset = 0; END IF;
	IF (iLimit IS NULL) THEN iLimit = 50; ELSIF (iLimit < 1) THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	--RAISE LOG 'aFields=% len=%', aFields, array_length(aFields, 1);
	IF (coalesce(array_length(aFields, 1), 0) > 0) THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF (jField IS NOT NULL) THEN
				IF ((jField->>'alias') IS NULL) THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF (coalesce(array_length(aSelection, 1), 0) < 1) THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		aSelection := aSelection || (jField->>'select');
		IF ((jField->>'alias') IS NULL) THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	--RAISE LOG 'aSelection=%', aSelection;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF (aFilters IS NOT NULL) THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			--RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			CONTINUE WHEN (json_typeof(jFilter) != 'array') OR (json_array_length(jFilter) != 3);
			
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			--RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			tColFilter := jCfg->'fields'->tCol->>'select';
			--RAISE LOG 'tColFilter=%', tColFilter;
			CONTINUE WHEN (tCol IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);
				WHEN 'list' THEN
					--CONTINUE;
					BEGIN
						tagVal := tVal::"comp"."tp_comp_tag";
					EXCEPTION
						WHEN OTHERS THEN RETURN error(-1, format('invalid tag(%s)', tVal));
					END;
					aWhere := aWhere || format('%s @> ARRAY[%L]', tColFilter, tagVal);
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	CASE tRelation
		WHEN 'carriers' THEN
			
			-- FILTERING into index array
			aWhere := aWhere || format('r.relation_type = %L', 'transport');
			aWhere := aWhere || format('r.comp_to = %L', iTragetCompId);
			IF (coalesce(array_length(aWhere, 1), 0) < 1) THEN aWhere := aWhere || 'TRUE'; END IF;
			tQuery := format('
				SELECT coalesce(array_agg(r.relation_id), ARRAY[]::bigint[])
				FROM comp_relations r
				LEFT JOIN comps c ON c.id = r.comp_from
				WHERE %s',
				array_to_string(aWhere, ' AND ')
			);
			RAISE LOG 'tQuery: %', tQuery;
			EXECUTE tQuery INTO aKeys;
			iTotal := coalesce(array_length(aKeys, 1), 0);
			RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
			
			-- ORDERING & PAGENATION 
			aResult := ARRAY[]::json[];
			IF (iTotal > 0) THEN
				tQuery := format('
					SELECT array_agg(row_to_json(__comp_row)) FROM (
						SELECT %s
						FROM UNNEST(ARRAY[%s]) __relation_id
						LEFT JOIN comp_relations r ON __relation_id = r.%I
						LEFT JOIN comps c ON c.id = r.comp_from
						ORDER BY %s %s OFFSET %L LIMIT %L
					) __comp_row',
					array_to_string(aSelection, ', '),
					array_to_string(aKeys, ', '),
					(jCfg->'fields'->(jCfg->>'default_field')->>'col'),
					tOrderBy, tDir, iOffset, iLimit
				);
				RAISE LOG 'tQuery: %', tQuery;
				EXECUTE tQuery INTO aResult;
			END IF;
		
		WHEN 'expeditors' THEN
			
			-- FILTERING into index array
			aWhere1 := aWhere  || format('r.comp_from = %L', iTragetCompId);
			aWhere1 := aWhere1 || format('r.relation_type = %L', 'transport');
			aWhere2 := aWhere  || format('r.comp_to = %L', iTragetCompId);
			aWhere2 := aWhere2 || format('r.relation_type = %L', 'expedition');
			IF (coalesce(array_length(aWhere1, 1), 0) < 1) THEN aWhere1 := aWhere1 || 'TRUE'; END IF;
			IF (coalesce(array_length(aWhere2, 1), 0) < 1) THEN aWhere2 := aWhere2 || 'TRUE'; END IF;
			tQuery := format('
				SELECT
					coalesce(ARRAY_AGG(__rels.relation_id), ARRAY[]::bigint[]),
					coalesce(ARRAY_AGG(__rels.comp_id), ARRAY[]::bigint[])
				FROM (
					SELECT r.relation_id, c.id comp_id
					FROM comp_relations r
					LEFT JOIN comps c ON c.id = r.comp_to
					WHERE %s
						UNION
					SELECT r.relation_id, c.id comp_id
					FROM comp_relations r
					LEFT JOIN comps c ON c.id = r.comp_from
					WHERE %s
				) __rels',
				array_to_string(aWhere1, ' AND '),
				array_to_string(aWhere2, ' AND ')
			);
			RAISE LOG 'tQuery: %', tQuery;
			EXECUTE tQuery INTO aKeys, aKeys2;
			iTotal := coalesce(array_length(aKeys, 1), 0);
			RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
			RAISE LOG 'aKeys2(%)=%', iTotal, aKeys2;
			
			-- ORDERING & PAGENATION 
			aResult := ARRAY[]::json[];
			IF (iTotal > 0) THEN
				tQuery := format('
					SELECT array_agg(row_to_json(sub1)) FROM (
						SELECT %s
						FROM (SELECT unnest(array[%s]) __relation_id, unnest(array[%s]) __comp_id) __pair
						LEFT JOIN comp_relations r ON __pair.__relation_id = r.%I
						LEFT JOIN comps c ON c.id = __pair.__comp_id
						ORDER BY %s %s OFFSET %L LIMIT %L
					) sub1',
					array_to_string(aSelection, ', '),
					array_to_string(aKeys, ', '),
					array_to_string(aKeys2, ', '),
					(jCfg->'fields'->(jCfg->>'default_field')->>'col'),
					tOrderBy, tDir, iOffset, iLimit
				);
				RAISE LOG 'tQuery: %', tQuery;
				EXECUTE tQuery INTO aResult;
			END IF;
			
		WHEN 'shippers' THEN
			
			-- FILTERING into index array
			aWhere := aWhere || format('r.relation_type = %L', 'expedition');
			aWhere := aWhere || format('r.comp_from = %L', iTragetCompId);
			IF (coalesce(array_length(aWhere, 1), 0) < 1) THEN aWhere := aWhere || 'TRUE'; END IF;
			tQuery := format('
				SELECT coalesce(array_agg(r.relation_id), ARRAY[]::bigint[])
				FROM comp_relations r
				LEFT JOIN comps c ON c.id = r.comp_to
				WHERE %s',
				array_to_string(aWhere, ' AND ')
			);
			RAISE LOG 'tQuery: %', tQuery;
			EXECUTE tQuery INTO aKeys;
			iTotal := coalesce(array_length(aKeys, 1), 0);
			RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
			
			-- ORDERING & PAGENATION 
			aResult := ARRAY[]::json[];
			IF (iTotal > 0) THEN
				tQuery := format('
					SELECT array_agg(row_to_json(__comp_row)) FROM (
						SELECT %s
						FROM UNNEST(ARRAY[%s]) __relation_id
						LEFT JOIN comp_relations r ON __relation_id = r.%I
						LEFT JOIN comps c ON c.id = r.comp_to
						ORDER BY %s %s OFFSET %L LIMIT %L
					) __comp_row',
					array_to_string(aSelection, ', '),
					array_to_string(aKeys, ', '),
					(jCfg->'fields'->(jCfg->>'default_field')->>'col'),
					tOrderBy, tDir, iOffset, iLimit
				);
				RAISE LOG 'tQuery: %', tQuery;
				EXECUTE tQuery INTO aResult;
			END IF;
			
		WHEN 'social' THEN
			
			IF iSelfCompId != iTragetCompId THEN RETURN error(-1, format('comp(%s) cant get social relations of comp(%s)', iSelfCompId, iTragetCompId)); END IF;
			
			-- FILTERING into index array
			aWhere := aWhere || format('r.relation_type = %L', 'social');
			aWhere := aWhere || format('r.comp_from = %L', iTragetCompId);
			IF (coalesce(array_length(aWhere, 1), 0) < 1) THEN aWhere := aWhere || 'TRUE'; END IF;
			tQuery := format('
				SELECT coalesce(array_agg(r.relation_id), ARRAY[]::bigint[])
				FROM comp_relations r
				LEFT JOIN comps c ON c.id = r.comp_to
				WHERE %s',
				array_to_string(aWhere, ' AND ')
			);
			RAISE LOG 'tQuery: %', tQuery;
			EXECUTE tQuery INTO aKeys;
			iTotal := coalesce(array_length(aKeys, 1), 0);
			RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
			
			-- ORDERING & PAGENATION 
			aResult := ARRAY[]::json[];
			IF (iTotal > 0) THEN
				tQuery := format('
					SELECT array_agg(row_to_json(__comp_row)) FROM (
						SELECT %s
						FROM UNNEST(ARRAY[%s]) __relation_id
						LEFT JOIN comp_relations r ON __relation_id = r.%I
						LEFT JOIN comps c ON c.id = r.comp_to
						ORDER BY %s %s OFFSET %L LIMIT %L
					) __comp_row',
					array_to_string(aSelection, ', '),
					array_to_string(aKeys, ', '),
					(jCfg->'fields'->(jCfg->>'default_field')->>'col'),
					tOrderBy, tDir, iOffset, iLimit
				);
				RAISE LOG 'tQuery: %', tQuery;
				EXECUTE tQuery INTO aResult;
			END IF;
			
		WHEN 'blacklist' THEN
			
			IF iSelfCompId != iTragetCompId THEN RETURN error(-1, format('comp(%s) cant get blacklist relation of comp(%s)', iSelfCompId, iTragetCompId)); END IF;
			
			-- FILTERING into index array
			aWhere := aWhere || format('r.relation_type = %L', 'blacklist');
			aWhere := aWhere || format('r.comp_from = %L', iTragetCompId);
			IF (coalesce(array_length(aWhere, 1), 0) < 1) THEN aWhere := aWhere || 'TRUE'; END IF;
			tQuery := format('
				SELECT coalesce(array_agg(r.relation_id), ARRAY[]::bigint[])
				FROM comp_relations r
				LEFT JOIN comps c ON c.id = r.comp_to
				WHERE %s',
				array_to_string(aWhere, ' AND ')
			);
			RAISE LOG 'tQuery: %', tQuery;
			EXECUTE tQuery INTO aKeys;
			iTotal := coalesce(array_length(aKeys, 1), 0);
			RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
			
			-- ORDERING & PAGENATION 
			aResult := ARRAY[]::json[];
			IF (iTotal > 0) THEN
				tQuery := format('
					SELECT array_agg(row_to_json(__comp_row)) FROM (
						SELECT %s
						FROM UNNEST(ARRAY[%s]) __relation_id
						LEFT JOIN comp_relations r ON __relation_id = r.%I
						LEFT JOIN comps c ON c.id = r.comp_to
						ORDER BY %s %s OFFSET %L LIMIT %L
					) __comp_row',
					array_to_string(aSelection, ', '),
					array_to_string(aKeys, ', '),
					(jCfg->'fields'->(jCfg->>'default_field')->>'col'),
					tOrderBy, tDir, iOffset, iLimit
				);
				RAISE LOG 'tQuery: %', tQuery;
				EXECUTE tQuery INTO aResult;
			END IF;
			
		ELSE
			RETURN error(-1, format('unhandled relation(%s)', tRelation));
	END CASE;
	
	RETURN json_build_object(
		'total', iTotal,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'related_list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.rel_list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: rel_req_list(json, json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION rel_req_list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	tType text;
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":             {"col": "comp_relation_request_id",  "select": "r.comp_relation_request_id",  "alias": "id",             "type": "number"},
			"ctime":          {"col": "ctime",                     "select": "utils__ts2int(r.ctime)",      "alias": "ctime",          "type": "timestamp"},
			"type":           {"col": "relation_type",             "select": "r.relation_type",             "alias": "type",           "type": "text"},
			"comp_from":      {"col": "comp_from",                 "select": "r.comp_from",                 "alias": "from",           "type": "number"},
			"comp_to":        {"col": "comp_to",                   "select": "r.comp_to",                   "alias": "to",             "type": "number"},
			"requester_id":   {"col": "requestor_comp_id",         "select": "r.requestor_comp_id",         "alias": "requester_id",   "type": "number"},
			"requester_name": {"col": "requestor_comp_id",         "select": "er.name",                     "alias": "requester_name", "type": "number"},
			"requested_id":   {"col": "requested_comp_id",         "select": "r.requested_comp_id",         "alias": "requested_id",   "type": "number"},
			"requested_name": {"col": "requested_comp_id",         "select": "ed.name",                     "alias": "requested_name", "type": "number"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	aKeys bigint[];
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'comp.rel_req_list % %', cl, cm;
	
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', cl->>'user_id')); END IF;
	--RAISE LOG 'iCompId=%', iCompId;
	
	tType := cm->>'type';
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	
	--IF (tOrderBy IS NULL) OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN tOrderBy = jCfg->>'default_field'; END IF;
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF (iLimit < 1) THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	--RAISE LOG 'aFields=% len=%', aFields, array_length(aFields, 1);
	IF coalesce(array_length(aFields, 1), 0) > 0 THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF jField IS NOT NULL THEN
				IF (jField->>'alias') IS NULL THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s "%s"', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	RAISE LOG 'aSelection=%', aSelection;
	IF coalesce(array_length(aSelection, 1), 0) < 1 THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		--aSelection := aSelection || (jField->>'select');
		IF (jField->>'alias') IS NULL THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	RAISE LOG 'aSelection=%', aSelection;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF (aFilters IS NOT NULL) THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			--CONTINUE WHEN (json_typeof(jFilter) != 'object');
			CONTINUE WHEN (json_typeof(jFilter) != 'array') OR (json_array_length(jFilter) != 3);
			--RAISE LOG 'json_array_length=%', json_array_length(jFilter);
			--RAISE LOG 'json_array: col=% op=% val=%', jFilter->>0, jFilter->>1, jFilter->>2;
			
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			--RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			tColFilter := jCfg->'fields'->tCol->>'select';
			--RAISE LOG 'tColFilter=%', tColFilter;
			CONTINUE WHEN (tCol IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					CASE tOp
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, tVal);
						ELSE           aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);
					END CASE;
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	-- FILTERING into temp table
	
	tQuery := format('
		SELECT coalesce(array_agg(%s), ARRAY[]::bigint[])
		FROM "comp_relation_requests" r
		LEFT JOIN "comps" c ON c.id = r.requested_comp_id',
		jCfg->'fields'->(jCfg->>'default_field')->>'select'
	);
	
	CASE tType
		WHEN 'in_carriers' THEN
			aWhere := aWhere || format('requested_comp_id = %L', iCompId);
			aWhere := aWhere || format('comp_to = %L', iCompId);
			aWhere := aWhere || format('relation_type = %L', 'transport');
		WHEN 'in_expeditors' THEN
			aWhere := aWhere || format('requested_comp_id = %L', iCompId);
			aWhere := aWhere || format('(comp_from = %L AND relation_type = %L) OR (comp_to = %L AND relation_type = %L)', iCompId, 'transport', iCompId, 'expedition');
		WHEN 'in_shippers' THEN
			aWhere := aWhere || format('requested_comp_id = %L', iCompId);
			aWhere := aWhere || format('comp_from = %L', iCompId);
			aWhere := aWhere || format('relation_type = %L', 'expedition');
		WHEN 'out_carriers' THEN
			aWhere := aWhere || format('requestor_comp_id = %L', iCompId);
			aWhere := aWhere || format('comp_to = %L', iCompId);
			aWhere := aWhere || format('relation_type = %L', 'transport');
		WHEN 'out_expeditors' THEN
			aWhere := aWhere || format('requestor_comp_id = %L', iCompId);
			aWhere := aWhere || format('(comp_from = %L AND relation_type = %L) OR (comp_to = %L AND relation_type = %L)', iCompId, 'transport', iCompId, 'expedition');
		WHEN 'out_shippers' THEN
			aWhere := aWhere || format('requestor_comp_id = %L', iCompId);
			aWhere := aWhere || format('comp_from = %L', iCompId);
			aWhere := aWhere || format('relation_type = %L', 'expedition');
		ELSE
			-- тип не указан, вываливаем все запросы где фигурирует моя компания
			aWhere := aWhere || format('requestor_comp_id = %L OR requested_comp_id = %L', iCompId, iCompId);
	END CASE;
	
	IF coalesce(array_length(aWhere, 1), 0) > 0 THEN
		tQuery := tQuery || format(' WHERE (%s)', array_to_string(aWhere, ') AND ('));
	END IF;
	
	RAISE LOG 'tQuery: %', tQuery;
	EXECUTE tQuery INTO aKeys;
	iTotal := coalesce(array_length(aKeys, 1), 0);
	RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
	
	--SELECT count(*) FROM tmp1 INTO iTotal;
	--RAISE LOG 'iTotal=%', iTotal;
	
	-- ORDERING & PAGENATION 
	
	aResult := ARRAY[]::json[];
	IF iTotal > 0 THEN
		tQuery := format('
			SELECT array_agg(row_to_json(__request_row)) FROM (
				SELECT %s
				FROM unnest(array[%s]) __request_id
				LEFT JOIN "comp_relation_requests" r ON __request_id = r.%I
				LEFT JOIN "comps" er ON er.id = r.requestor_comp_id
				LEFT JOIN "comps" ed ON ed.id = r.requested_comp_id
				ORDER BY %s %s OFFSET %L LIMIT %L
			) __request_row',
			array_to_string(aSelection, ', '),
			array_to_string(aKeys, ', '),
			(jCfg->'fields'->(jCfg->>'default_field')->>'col'),
			tOrderBy, tDir, iOffset, iLimit
		);
		RAISE LOG 'tQuery: %', tQuery;
		EXECUTE tQuery INTO aResult;
	END IF;
	
	RETURN json_build_object(
		'total', iTotal,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'comp.rel_req_list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.rel_req_list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: rel_summary(json, json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION rel_summary(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	--tSourceTable text = '"lead"."registered"';
	
	iSelfCompId bigint;
	iTragetCompId bigint;
	
	aTypes text[];
	
	jResult json = '{}';
	
	iCnt bigint = 0;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG '------------------------------------------------------------------';
	RAISE LOG 'comp.rel_summary % %', cl, cm;
	
	iSelfCompId := utils__text2bigint(cl->>'comp_id');
	iTragetCompId := utils__text2bigint(cm->>'comp_id');
	IF iSelfCompId IS NULL THEN RETURN error(-1, 'you must have comp'); END IF;
	IF iTragetCompId IS NULL THEN RETURN error(-1, 'comp_id required'); END IF;
	
	BEGIN
		SELECT ARRAY_AGG(el) INTO aTypes FROM json_array_elements_text(cm->'types') el;
	EXCEPTION
		WHEN OTHERS THEN RETURN error(-1, 'invalid types');
	END;
	
	IF 'carriers' = ANY(aTypes) THEN
		SELECT COUNT("relation_id")
		INTO iCnt
		FROM "comp_relations"
		WHERE "relation_type" = 'transport' AND "comp_to" = iTragetCompId;  -- todo: make trigger
		jResult := utils__j_merge(jResult, json_build_object('carriers', iCnt));
	END IF;
	
	IF 'expeditors' = ANY(aTypes) THEN
		SELECT COUNT("relation_id")
		INTO iCnt
		FROM "comp_relations"
		WHERE ("relation_type" = 'transport' AND "comp_from" = iTragetCompId)
		OR ("relation_type" = 'expedition' AND "comp_to" = iTragetCompId);  -- todo: make trigger
		jResult := utils__j_merge(jResult, json_build_object('expeditors', iCnt));
	END IF;
	
	IF 'shippers' = ANY(aTypes) THEN
		SELECT COUNT("relation_id")
		INTO iCnt
		FROM "comp_relations"
		WHERE "relation_type" = 'expedition' AND "comp_from" = iTragetCompId;  -- todo: make trigger
		jResult := utils__j_merge(jResult, json_build_object('shippers', iCnt));
	END IF;
	
	IF 'social' = ANY(aTypes) AND iTragetCompId = iSelfCompId THEN
		SELECT COUNT("relation_id")
		INTO iCnt
		FROM "comp_relations"
		WHERE "relation_type" = 'social' AND "comp_from" = iTragetCompId;  -- todo: make trigger
		jResult := utils__j_merge(jResult, json_build_object('social', iCnt));
	END IF;
	
	IF 'blacklist' = ANY(aTypes) AND iTragetCompId = iSelfCompId THEN
		SELECT COUNT("relation_id")
		INTO iCnt
		FROM "comp_relations"
		WHERE "relation_type" = 'blacklist' AND "comp_from" = iTragetCompId;  -- todo: make trigger
		jResult := utils__j_merge(jResult, json_build_object('blacklist', iCnt));
	END IF;
	
	RETURN jResult;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'comp.rel_summary failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.rel_summary(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: relation_request_accept(json, json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION relation_request_accept(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iRequestId bigint;
	iCompId bigint;
	iRelationId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	eStack text;
	
BEGIN
	
	RAISE LOG '------------------------------------------------------------------';
	RAISE LOG 'comp.relation_request_accept % %', cl, cm;
	
	iRequestId := utils__text2bigint(cm->>'request_id');
	RAISE LOG 'iRequestId=%', iRequestId;
	
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iCompId IS NULL THEN RETURN error(-1, 'you have no comp'); END IF;
	
	RAISE LOG 'iRequestId=% iCompId=%', iRequestId, iCompId;
	
	INSERT INTO comp_relations (relation_type, comp_from, comp_to) (
		SELECT relation_type, comp_from, comp_to FROM comp_relation_requests WHERE comp_relation_request_id = iRequestId AND requested_comp_id = iCompId
	) RETURNING relation_id INTO iRelationId;
	
	IF iRelationId IS NULL THEN RETURN error(-1, 'no relation_id'); END IF;
	
	DELETE FROM comp_relation_requests WHERE comp_relation_request_id = iRequestId;
	
	RETURN json_build_object(
		'accepted_request_id', iRequestId,
		'relation_id', iRelationId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'comp.relation_request_accept failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		IF eConstraint = 'comp_relations_comp_to_key' THEN RETURN error(-1, 'relation already exists'); END IF;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.relation_request_accept(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: relation_request_delete(json, json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION relation_request_delete(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	iRequestId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG '------------------------------------------------------------------';
	RAISE LOG 'comp.relation_request_delete % %', cl, cm;
	
	iRequestId := utils__text2bigint(cm->>'request_id');
	IF iRequestId IS NULL THEN RETURN error(-1, 'request_id required'); END IF;
	
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iCompId IS NULL THEN RETURN error(-1, 'you have no comp'); END IF;
	
	RAISE LOG 'iRequestId=% iCompId=%', iRequestId, iCompId;
	
	DELETE FROM comp_relation_requests WHERE comp_relation_request_id = iRequestId AND requestor_comp_id = iCompId;
	IF NOT FOUND THEN RETURN error(-1, format('relation_request(%s) from comp(%s) not found', iRequestId, iCompId)); END IF;
	
	RETURN json_build_object(
		'deleted_request_id', iRequestId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'comp.relation_request_delete failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.relation_request_delete(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: relation_request_refuse(json, json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION relation_request_refuse(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	iRequestId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG '------------------------------------------------------------------';
	RAISE LOG 'comp.relation_request_refuse % %', cl, cm;
	
	iRequestId := utils__text2bigint(cm->>'request_id');
	IF iRequestId IS NULL THEN RETURN error(-1, 'request_id required'); END IF;
	
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iCompId IS NULL THEN RETURN error(-1, 'you have no comp'); END IF;
	
	RAISE LOG 'iRequestId=% iCompId=%', iRequestId, iCompId;
	
	DELETE FROM comp_relation_requests WHERE comp_relation_request_id = iRequestId AND requested_comp_id = iCompId;
	IF NOT FOUND THEN RETURN error(-1, format('relation_request(%s) for comp(%s) not found', iRequestId, iCompId)); END IF;
	
	RETURN json_build_object(
		'refused_request_id', iRequestId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'comp.relation_request_refuse failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.relation_request_refuse(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: trigger_comp_invite_after_insert(); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION trigger_comp_invite_after_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tCompState text;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	-- 
	RAISE LOG '-- comp.trigger_comp_invite_before_insert: % % % %', TG_WHEN, TG_OP, TG_RELNAME, NEW;  -- TG_OP=INSERT TG_WHEN=AFTER NEW=(38,trade,281,283)
	
	IF TG_WHEN != 'BEFORE' OR TG_OP != 'INSERT' OR TG_RELNAME != 'invites' THEN
		RAISE EXCEPTION 'invalid context for trigger_comp_invite_before_insert: % % %', TG_OP, TG_WHEN, TG_RELNAME USING HINT = 'invalid_trigger_context';
	END IF;
	
	SELECT "state" INTO tCompState FROM "comps" WHERE "id" = NEW.comp_id;
	
	IF NOT FOUND THEN
		RAISE EXCEPTION 'comp(%) not found', NEW.comp_id USING HINT = 'comp_not_found';
	END IF;
	
	IF tCompState != 'new' THEN
		RAISE EXCEPTION 'state(%) of comp(%) must be "new"', tCompState, NEW.comp_id USING HINT = 'invalid_comp_state';
	END IF;
	
	UPDATE "comps" SET "state" = ('pending'::"comp"."tp_comp_state") WHERE "id" = NEW.comp_id;
	
	CASE (TG_OP)
		WHEN 'INSERT' THEN RETURN NEW;
		WHEN 'UPDATE' THEN RETURN NEW;
		ELSE               RETURN OLD;
	END CASE;
	
EXCEPTION
	WHEN raise_exception THEN
		RAISE LOG 'trigger_comp_invite_before_insert failed: RAISE';
		RAISE;
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'comp.trigger_comp_invite_before_insert failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		CASE (TG_OP)
			WHEN 'INSERT' THEN RETURN NEW;
			WHEN 'UPDATE' THEN RETURN OLD;
			ELSE RETURN OLD;
		END CASE;
END;
$$;


ALTER FUNCTION comp.trigger_comp_invite_after_insert() OWNER TO cargochat_u;

--
-- Name: trigger_comp_relations(); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION trigger_comp_relations() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	CASE (TG_WHEN)
		
		WHEN 'AFTER' THEN
			
			CASE (TG_OP)
				
				WHEN 'INSERT' THEN
					RAISE LOG 'trigger_comp_relations: TG_OP=% TG_WHEN=% NEW=%', TG_OP, TG_WHEN, NEW;
					
					IF NEW."relation_type" = ANY(ARRAY['transport'::"comp"."tp_comp_relation_type", 'expedition'::"comp"."tp_comp_relation_type"]) THEN
						
						CASE (NEW."relation_type")
							WHEN 'transport'::"comp"."tp_comp_relation_type" THEN
								-- update counters
								PERFORM "sub_comp_recalc_customers"(NEW."comp_from");
								PERFORM "sub_comp_recalc_carriers"(NEW."comp_to");
							WHEN 'expedition'::"comp"."tp_comp_relation_type" THEN
								-- add tag `expeditor` to comp_from
								BEGIN
									INSERT INTO "public"."comp_tags" ("comp_id", "tag") VALUES (NEW."comp_from", 'expeditor'::"comp"."tp_comp_tag");
								EXCEPTION
									WHEN OTHERS THEN NULL;
								END;
							ELSE
						END CASE;
					
						-- создаем перекрестные контакты между юзерами компаний comp_form и comp_to
						INSERT INTO "user"."contacts" ("user_id", "contact_user_id")
						SELECT "u1"."id", "u2"."id"
						FROM "public"."users" "u1", "public"."users" "u2"
						WHERE
							(
								("u1"."comp_id" = NEW."comp_from" AND "u2"."comp_id" = NEW."comp_to")
									OR
								("u1"."comp_id" = NEW."comp_to" AND "u2"."comp_id" = NEW."comp_from")
							)
								AND
							NOT EXISTS (SELECT "contact_id" FROM "user"."contacts" WHERE "user_id" = "u1"."id" AND "contact_user_id" = "u2"."id");
						
					END IF;
					
					RETURN NEW;
					
				WHEN 'UPDATE' THEN
					RAISE LOG 'trigger_comp_relations: TG_OP=% TG_WHEN=% NEW=%', TG_OP, TG_WHEN, NEW;
					
					CASE (NEW."relation_type")
						WHEN 'transport'::"comp"."tp_comp_relation_type" THEN
							-- update counters
							IF OLD."comp_from" != NEW."comp_from" THEN
								PERFORM "sub_comp_recalc_customers"(OLD."comp_from");
								PERFORM "sub_comp_recalc_customers"(NEW."comp_from");
							END IF;
							IF OLD."comp_to" != NEW."comp_to" THEN
								PERFORM "sub_comp_recalc_carriers"(OLD."comp_to");
								PERFORM "sub_comp_recalc_carriers"(NEW."comp_to");
							END IF;
						WHEN 'expedition'::"comp"."tp_comp_relation_type" THEN
							-- update tag `expeditor`
							IF OLD."comp_from" != NEW."comp_from" THEN
								-- relax, it's never happens =)
							END IF;
						ELSE
					END CASE;
					
					RETURN NEW;
					
				WHEN 'DELETE' THEN
					RAISE LOG 'trigger_comp_relations: TG_OP=% TG_WHEN=% OLD=%', TG_OP, TG_WHEN, OLD;
					
					CASE OLD."relation_type"
						WHEN 'transport' THEN
							PERFORM "sub_comp_recalc_customers"(OLD."comp_from");
							PERFORM "sub_comp_recalc_carriers"(OLD."comp_to");
						WHEN 'expedition' THEN
							-- remove tag `expeditor` to comp_from
							DELETE FROM "comp_tags" WHERE "comp_id" = OLD."comp_from" AND "tag" = 'expeditor'::"comp"."tp_comp_tag";
						ELSE
					END CASE;
					
					RETURN OLD;
					
				ELSE
					RAISE EXCEPTION 'trigger_comp_relations unhandled TG_OP';
				
			END CASE;
			
		ELSE
			RAISE EXCEPTION 'trigger_comp_relations unhandled TG_WHEN';
			
	END CASE;
	
	RAISE EXCEPTION 'trigger_comp_relations unexpected EOF';
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'trigger_comp_relations failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE;
END;
$$;


ALTER FUNCTION comp.trigger_comp_relations() OWNER TO cargochat_u;

--
-- Name: trigger_comp_vehicle_updater(); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION trigger_comp_vehicle_updater() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	--RAISE LOG '-- trigger_comp_vehicle_updater: % % %', TG_WHEN, TG_OP, TG_RELNAME;
	-- trigger_comp_vehicle_updater: AFTER INSERT price_request_bets (17,"2015-08-26 03:12:05.644307",12,100,1,281)
	
	CASE (TG_OP)
		WHEN 'INSERT' THEN
			PERFORM sub_comp_recalc_vehicles(NEW."comp_id");
			RETURN NEW;
		WHEN 'UPDATE' THEN
			IF OLD."comp_id" != NEW."comp_id" OR OLD."type" != NEW."type" THEN
				PERFORM sub_comp_recalc_vehicles(OLD."comp_id");
				PERFORM sub_comp_recalc_vehicles(NEW."comp_id");
			END IF;
			RETURN NEW;
		ELSE
			PERFORM sub_comp_recalc_vehicles(OLD."comp_id");
			RETURN OLD;
			
	END CASE;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'trigger_comp_vehicle_updater failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		--CASE (TG_OP)
		--	WHEN 'INSERT' THEN RETURN NEW;
		--	WHEN 'UPDATE' THEN RETURN OLD;
		--	ELSE RETURN OLD;
		--END CASE;
END;
$$;


ALTER FUNCTION comp.trigger_comp_vehicle_updater() OWNER TO cargochat_u;

--
-- Name: update(json, json); Type: FUNCTION; Schema: comp; Owner: cargochat_u
--

CREATE FUNCTION update(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	aParams text[];
	tSQL text;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	eStack text;
	
BEGIN
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	IF ("public"."comp_user_perm_test"(iUserId, iCompId, "const"."user_comp_perm__info_manager"()) IS NOT TRUE) THEN
		RETURN error(-3, format('perm(%s) required: user(%s) comp(%s)', 'info_manager', iUserId, iCompId));
	END IF;
	
	aParams := "utils"."prepare_update"(
		cm,
		'{
			"taxation":             {"col": "taxation",            "type": "text"},
			"email":                {"col": "email",               "type": "text"},
			"phone":                {"col": "phone",               "type": "mobile"},
			"web_site":             {"col": "web_site",            "type": "text"},
			"work_hours":           {"col": "work_hours",          "type": "text"},
			"rel_trade_from":       {"col": "rel_trade_from",      "type": "text"},
			"rel_trade_to":         {"col": "rel_trade_to",        "type": "text"},
			"rel_transport_from":   {"col": "rel_transport_from",  "type": "text"},
			"rel_transport_to":     {"col": "rel_transport_to",    "type": "text"},
			"hard_tag_trade_from":  {"col": "hard_tag_trade_from", "type": "bool"},
			"info":                 {"col": "info",                "type": "text"},
			"j_doc":                {"col": "j_doc",               "type": "json"}
		}'
	);
	
	IF aParams IS NOT NULL AND array_length(aParams, 1) > 0 THEN
		tSQL := format('UPDATE "comps" SET %s WHERE "id" = %L', array_to_string(aParams, ','), iCompId);
		RAISE LOG 'tSQL: %', tSQL;
		EXECUTE tSQL;
	END IF;
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'comp_update failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=% eStack=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		IF (SQLSTATE = '23502') AND (eCol = 'ogrn') THEN RETURN error(-8, 'ogrn required'); END IF;
		IF (SQLSTATE = '22P02') THEN RETURN error(-10, 'invalid data format'); END IF;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION comp.update(cl json, cm json) OWNER TO cargochat_u;

SET search_path = const, pg_catalog;

--
-- Name: msg_ch_user_flg__creator(); Type: FUNCTION; Schema: const; Owner: cargochat_u
--

CREATE FUNCTION msg_ch_user_flg__creator() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN 2;
END
$$;


ALTER FUNCTION const.msg_ch_user_flg__creator() OWNER TO cargochat_u;

--
-- Name: msg_ch_user_flg__just_invited(); Type: FUNCTION; Schema: const; Owner: cargochat_u
--

CREATE FUNCTION msg_ch_user_flg__just_invited() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN 1;
END
$$;


ALTER FUNCTION const.msg_ch_user_flg__just_invited() OWNER TO cargochat_u;

--
-- Name: price_req_flg_for_related_shippers_only(); Type: FUNCTION; Schema: const; Owner: cargochat_u
--

CREATE FUNCTION price_req_flg_for_related_shippers_only() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN 1;
END
$$;


ALTER FUNCTION const.price_req_flg_for_related_shippers_only() OWNER TO cargochat_u;

--
-- Name: user_comp_perm__info_manager(); Type: FUNCTION; Schema: const; Owner: cargochat_u
--

CREATE FUNCTION user_comp_perm__info_manager() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN 16;
END
$$;


ALTER FUNCTION const.user_comp_perm__info_manager() OWNER TO cargochat_u;

--
-- Name: user_comp_perm__invites_manager(); Type: FUNCTION; Schema: const; Owner: cargochat_u
--

CREATE FUNCTION user_comp_perm__invites_manager() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN 32;
END
$$;


ALTER FUNCTION const.user_comp_perm__invites_manager() OWNER TO cargochat_u;

--
-- Name: user_comp_perm__perms_manager(); Type: FUNCTION; Schema: const; Owner: cargochat_u
--

CREATE FUNCTION user_comp_perm__perms_manager() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN 2;
END
$$;


ALTER FUNCTION const.user_comp_perm__perms_manager() OWNER TO cargochat_u;

--
-- Name: user_comp_perm__relations_manager(); Type: FUNCTION; Schema: const; Owner: cargochat_u
--

CREATE FUNCTION user_comp_perm__relations_manager() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN 8;
END
$$;


ALTER FUNCTION const.user_comp_perm__relations_manager() OWNER TO cargochat_u;

--
-- Name: user_comp_perm__tenders_manager(); Type: FUNCTION; Schema: const; Owner: cargochat_u
--

CREATE FUNCTION user_comp_perm__tenders_manager() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN 4;
END
$$;


ALTER FUNCTION const.user_comp_perm__tenders_manager() OWNER TO cargochat_u;

--
-- Name: user_comp_perm__unlim(); Type: FUNCTION; Schema: const; Owner: cargochat_u
--

CREATE FUNCTION user_comp_perm__unlim() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN 1;
END
$$;


ALTER FUNCTION const.user_comp_perm__unlim() OWNER TO cargochat_u;

SET search_path = lead, pg_catalog;

--
-- Name: list(json, json); Type: FUNCTION; Schema: lead; Owner: cargochat_u
--

CREATE FUNCTION list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	-- schema
	aSelection text[]  = ARRAY[]::text[];
	
	-- {"cm":"lead_list","fields":["id","ctime","ipaddr","email","phone","name","cid","cname","flags"],"sid":"f954c4df14b7c6482e22378c0514ed47"}
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":        {"filter": "t.id",          "select": "t.id",                                         "type": "number"},
			"ctime":     {"filter": "t.ctime",       "select": "utils__ts2int(t.ctime)",  "alias": "ctime",    "type": "timestamp"},
			"ipaddr":    {"filter": "t.ipaddr",      "select": "t.ipaddr",                                     "type": "text"},
			"email":     {"filter": "t.email",       "select": "t.email",                                      "type": "text"},
			"phone":     {"filter": "t.phone",       "select": "t.phone",                                      "type": "text"},
			"name":      {"filter": "t.name",        "select": "t.name",                                       "type": "text"},
			"cid":       {"filter": "c.id",          "select": "c.id",                    "alias": "cid",      "type": "number"},
			"cname":     {"filter": "c.name",        "select": "c.name",                  "alias": "cname",    "type": "text"},
			"flags":     {"filter": "t.flags",       "select": "t.flags",                                      "type": "number"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	-- ordering, pagenation
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	iLimit2 bigint;
	
	-- filtering
	aFilters json[];
	jFilter json;
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	-- fetching
	c1 refcursor;
	r1 record;
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[] = ARRAY[]::json[];
	
	-- error handling
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'lead.list % %', cl, cm;
	
	iUserId := "utils"."txt2int8"(cl->>'user_id');
	iCompId := "utils"."txt2int8"(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	IF "public"."user_perm_test"(iuserId, 'unlimited') IS NOT TRUE THEN RETURN error(-10, 'no perms'); END IF;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := "utils"."txt2int8"(cm->>'offset');
	iLimit      := "utils"."txt2int8"(cm->>'limit');
	
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF iLimit > 500 THEN iLimit = 500; END IF;
	iLimit2 := iLimit;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	IF coalesce(array_length(aFields, 1), 0) > 0 THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF jField IS NOT NULL THEN
				IF (jField->>'alias') IS NULL THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF coalesce(array_length(aSelection, 1), 0) < 1 THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF (jField->>'alias') IS NULL THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	
	BEGIN SELECT ARRAY_AGG(el) INTO aFilters FROM json_array_elements(cm->'filters') el; EXCEPTION WHEN OTHERS THEN NULL; END;
	
	IF aFilters IS NOT NULL THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			CONTINUE WHEN json_typeof(jFilter) != 'array' OR json_array_length(jFilter) != 3;
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			CONTINUE WHEN tCol IS NULL OR (jCfg->'fields'->tCol) IS NULL OR tVal IS NULL;
			tColFilter := jCfg->'fields'->tCol->>'filter';
			CONTINUE WHEN tCol IS NULL;
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN fVal IS NULL;
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
						ELSE CONTINUE;
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN iVal IS NULL;
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
						ELSE CONTINUE;
					END CASE;
				WHEN 'text' THEN
					CASE tOp
						WHEN 'eq' THEN aWhere := aWhere || format('%s::text = %L', tColFilter, tVal);  -- todo: use `like`, check dots
						ELSE           aWhere := aWhere || format('%s::text ~* E%L', tColFilter, tVal);  -- todo: use `like`, check dots
					END CASE;
			ELSE CONTINUE;
			END CASE;
		END LOOP;
	END IF;
	
	IF "utils"."len"(aWhere) < 1 THEN aWhere := aWhere || 'TRUE'::text; END IF;
	
	tQuery := format('
		SELECT %s
		FROM "lead"."registered" "t"
		LEFT JOIN "public"."comps" "c" ON  "c"."id" = "t"."comp_id"
		WHERE (%s)
		ORDER BY %s %s',
		array_to_string(aSelection, ', '),
		array_to_string(aWhere, ') AND ('),
		tOrderBy, tDir
	);
	
	RAISE LOG 'tQuery: %', tQuery;
	
	OPEN c1 FOR EXECUTE tQuery;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS iTotal = ROW_COUNT;
	RAISE LOG 'iTotal=%', iTotal;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD iOffset IN c1;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		aResult := aResult || row_to_json(r1);
		IF iLimit2 <= 1 THEN EXIT; END IF;
		iLimit2 := iLimit2 - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total', iTotal,
		'offset', iOffset,
		'limit', iLimit,
		'uid', iUserId,
		'cid', iCompId,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'lead.list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION lead.list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: list1(json, json); Type: FUNCTION; Schema: lead; Owner: cargochat_u
--

CREATE FUNCTION list1(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tSourceTable text = '"lead"."registered"';
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":        {"col": "id",          "select": "id",                                         "type": "number"},
			"ctime":     {"col": "ctime",       "select": "utils__ts2int(ctime)",  "alias": "ctime",    "type": "timestamp"},
			"ipaddr":    {"col": "ipaddr",      "select": "ipaddr",                                     "type": "text"},
			"email":     {"col": "email",       "select": "email",                                      "type": "text"},
			"phone":     {"col": "phone",       "select": "phone",                                      "type": "text"},
			"name":      {"col": "name",        "select": "name",                                       "type": "text"},
			"cid":       {"col": "c.id",        "select": "c.id",                  "alias": "cid",      "type": "number"},
			"cname":     {"col": "c.name",      "select": "c.name",                "alias": "cname",    "type": "text"},
			"flags":     {"col": "flags",       "select": "flags",                                      "type": "number"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	bVal boolean;
	fVal double precision;
	
	aKeys bigint[];
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'lead.list % %', cl, cm;
	
	IF user_perm_test(utils__text2bigint(cl->>'user_id'), 'unlimited') IS NOT TRUE THEN RETURN error(-10, 'no perms'); END IF;
	
	tOrderBy  := cm->>'orderBy';
	tDir      := cm->>'dir';
	iOffset   := cm->>'offset';
	iLimit    := cm->>'limit';
	
	IF tOrderBy IS NULL OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR (NOT (tDir = ANY(ARRAY['ASC','DESC']))) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF (iLimit < 1) THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	--RAISE LOG 'aFields=% len=%', aFields, array_length(aFields, 1);
	IF (coalesce(array_length(aFields, 1), 0) > 0) THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF (jField IS NOT NULL) THEN
				IF ((jField->>'alias') IS NULL) THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF (coalesce(array_length(aSelection, 1), 0) < 1) THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		aSelection := aSelection || (jField->>'select');
		IF ((jField->>'alias') IS NULL) THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	--RAISE LOG 'aSelection=%', aSelection;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF (aFilters IS NOT NULL) THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			--CONTINUE WHEN (json_typeof(jFilter) != 'object');
			CONTINUE WHEN (json_typeof(jFilter) != 'array') OR (json_array_length(jFilter) != 3);
			--RAISE LOG 'json_array_length=%', json_array_length(jFilter);
			--RAISE LOG 'json_array: col=% op=% val=%', jFilter->>0, jFilter->>1, jFilter->>2;
			
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			--RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			tColFilter := jCfg->'fields'->tCol->>'select';
			--RAISE LOG 'tColFilter=%', tColFilter;
			CONTINUE WHEN (tCol IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN fVal IS NULL;
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN iVal IS NULL;
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'boolean' THEN
					BEGIN bVal := tVal::boolean; EXCEPTION WHEN OTHERS THEN CONTINUE; END;
					IF bVal IS TRUE THEN
						aWhere := aWhere || format('%s', tColFilter);
					ELSIF bVal IS FALSE THEN
						aWhere := aWhere || format('NOT %s', tColFilter);
					END IF;
				WHEN 'text' THEN
					--aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);
					aWhere := aWhere || format('position(%L in %s) > 0', tVal, tColFilter);
					-- todo: use LIKE
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	-- FILTERING into aKeys
	
	tQuery := format(
		'SELECT coalesce(array_agg(%s), ARRAY[]::bigint[]) FROM %s',
		jCfg->'fields'->(jCfg->>'default_field')->>'select',
		tSourceTable
	);
	
	IF (coalesce(array_length(aWhere, 1), 0) > 0) THEN
		tQuery := tQuery || format(' WHERE %s', array_to_string(aWhere, ' AND '));
	END IF;
	
	RAISE LOG 'tQuery: %', tQuery;
	EXECUTE tQuery INTO aKeys;
	iTotal := coalesce(array_length(aKeys, 1), 0);
	RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
	
	-- ORDERING & PAGENATION 
	
	aResult := ARRAY[]::json[];
	IF (iTotal > 0) THEN
		tQuery := format('
			SELECT array_agg(row_to_json(sub1)) FROM (
				SELECT %s
				FROM unnest(array[%s]) tmp1
				LEFT JOIN %s ON (tmp1 = %I)
				ORDER BY %s %s OFFSET %L LIMIT %L
			) sub1',
			array_to_string(aSelection, ', '),
			array_to_string(aKeys, ', '),
			tSourceTable,
			(jCfg->'fields'->(jCfg->>'default_field')->>'col'),
			tOrderBy, tDir, iOffset, iLimit
		);
		RAISE LOG 'tQuery: %', tQuery;
		EXECUTE tQuery INTO aResult;
	END IF;
	
	RETURN json_build_object('total', iTotal, 'data', array_to_json(aResult));
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'lead.list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION lead.list1(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: reg(json, text); Type: FUNCTION; Schema: lead; Owner: cargochat_u
--

CREATE FUNCTION reg(cm json, t_ip_addr text) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $_$
DECLARE
	
	tEmail text;
	tPhone text;
	tPhoneCorrect text;
	tName text;
	iCompId bigint;
	iFlags bigint;
	iId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	eStack text;
	
BEGIN
	
	--RAISE LOG 'lead.reg %', cm;
	
	tEmail := cm->>'email';
	tPhone := cm->>'phone';
	tName := cm->>'name';
	iCompId := "utils"."txt2int8"(cm->>'comp_id');
	iFlags := "utils"."txt2int8"(cm->>'flags');
	
	IF tEmail IS NULL THEN RETURN error(-1, 'email required'); END IF;
	IF tEmail !~ '^[A-Za-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$' THEN RETURN error(-1, 'invalid email'); END IF;
	
	IF tPhone IS NULL THEN RETURN error(-2, 'phone required'); END IF;
	SELECT array_to_string(ARRAY(SELECT SUBSTRING(regexp_matches(tPhone, '(\d)', 'g')::text FROM 2 FOR 1)), '') INTO tPhoneCorrect;
	IF tPhoneCorrect IS NULL OR length(tPhoneCorrect) != 11 THEN RETURN error(-2, 'invalid phone'); END IF;
	
	IF tName IS NULL THEN RETURN error(-3, 'name required'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, 'comp_id required'); END IF;
	IF iFlags IS NULL THEN RETURN error(-1, 'flags required'); END IF;
	IF (iFlags & ~(x'01'::bigint | x'02'::bigint | x'04'::bigint)) != 0 THEN RETURN error(-1, 'invalid flags'); END IF;
	
	BEGIN
		
		INSERT INTO "lead"."registered" (
			"ipaddr",
			"email",
			"phone",
			"name",
			"comp_id",
			"flags"
		)
		VALUES (
			t_ip_addr,
			tEmail,
			tPhoneCorrect,
			tName,
			iCompId,
			iFlags
		)
		RETURNING "id" INTO iId;
		
	EXCEPTION
		WHEN OTHERS THEN
			GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
			IF eConstraint = 'registered_comp_id_fkey' THEN RETURN error(-1, 'invalid comp_id'); END IF;
			RAISE;
	END;
	
	RETURN json_build_object(
		'lead_id', iId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'lead.reg failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%, eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$_$;


ALTER FUNCTION lead.reg(cm json, t_ip_addr text) OWNER TO cargochat_u;

SET search_path = lplace, pg_catalog;

--
-- Name: _flg_lp_orders_for_expeditors(); Type: FUNCTION; Schema: lplace; Owner: cargochat_u
--

CREATE FUNCTION _flg_lp_orders_for_expeditors() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000001'::bigint;
END
$$;


ALTER FUNCTION lplace._flg_lp_orders_for_expeditors() OWNER TO cargochat_u;

--
-- Name: list(json, json); Type: FUNCTION; Schema: lplace; Owner: cargochat_u
--

CREATE FUNCTION list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	-- schema
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":       {"filter": "t.id",          "select": "t.id",                                       "type": "number"},
			"ts":       {"filter": "t.ctime",       "select": "utils__ts2int(t.ctime)",  "alias": "ts",     "type": "timestamp"},
			"flags":    {"filter": "t.flags",       "select": "t.flags",                                    "type": "number"},
			"name":     {"filter": "t.name",        "select": "t.name",                                     "type": "text"},
			"addr":     {"filter": "t.addr",        "select": "t.addr",                                     "type": "text"},
			"x":        {"filter": "t.x",           "select": "t.x",                                        "type": "number"},
			"y":        {"filter": "t.y",           "select": "t.y",                                        "type": "number"},
			"cid":      {"filter": "t.comp_id",     "select": "t.comp_id",               "alias": "cid",    "type": "number"},
			"cname":    {"filter": "c.name",        "select": "c.name",                  "alias": "cname",  "type": "string"},
			"chid":     {"filter": "t.channel_id",  "select": "t.channel_id",            "alias": "chid",   "type": "number"}
		}
	}';
	
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	-- ordering, pagenation
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	iLimit2 bigint;
	
	-- filtering
	aFilters json[];
	jFilter json;
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	-- fetching
	c1 refcursor;
	r1 record;
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[] = ARRAY[]::json[];
	
	-- error handling
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'lplace.list % %', cl, cm;
	
	iUserId := "utils"."txt2int8"(cl->>'user_id');
	iCompId := "utils"."txt2int8"(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := "utils"."txt2int8"(cm->>'offset');
	iLimit      := "utils"."txt2int8"(cm->>'limit');
	
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF iLimit > 500 THEN iLimit = 500; END IF;
	iLimit2 := iLimit;
	
	aFields := COALESCE(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	IF COALESCE(array_length(aFields, 1), 0) > 0 THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF jField IS NOT NULL THEN
				IF (jField->>'alias') IS NULL THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF COALESCE(array_length(aSelection, 1), 0) < 1 THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF (jField->>'alias') IS NULL THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	
	BEGIN SELECT ARRAY_AGG(el) INTO aFilters FROM json_array_elements(cm->'filters') el; EXCEPTION WHEN OTHERS THEN NULL; END;
	
	IF aFilters IS NOT NULL THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			CONTINUE WHEN json_typeof(jFilter) != 'array' OR json_array_length(jFilter) != 3;
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			CONTINUE WHEN tCol IS NULL OR (jCfg->'fields'->tCol) IS NULL OR tVal IS NULL;
			tColFilter := jCfg->'fields'->tCol->>'filter';
			CONTINUE WHEN tCol IS NULL;
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);  -- todo: use `like`, check dots
			ELSE
			END CASE;
		END LOOP;
	END IF;
	
	IF "utils"."len"(aWhere) < 1 THEN aWhere := aWhere || 'TRUE'::text; END IF;
	
	tQuery := format('
		SELECT %s
		FROM "lplace"."lplaces" "t"
		LEFT JOIN "public"."comps" "c" ON "c"."id" = "t"."comp_id"
		WHERE (%s)
		ORDER BY %s %s',
		array_to_string(aSelection, ', '),
		array_to_string(aWhere, ') AND ('),
		tOrderBy, tDir
	);
	
	RAISE LOG 'tQuery: %', tQuery;
	
	OPEN c1 FOR EXECUTE tQuery;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS iTotal = ROW_COUNT;
	RAISE LOG 'iTotal=%', iTotal;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD iOffset IN c1;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		aResult := aResult || row_to_json(r1);
		IF iLimit2 <= 1 THEN EXIT; END IF;
		iLimit2 := iLimit2 - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total', iTotal,
		'offset', iOffset,
		'limit', iLimit,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'lplace.list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION lplace.list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: manage(json, json); Type: FUNCTION; Schema: lplace; Owner: cargochat_u
--

CREATE FUNCTION manage(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	t_action TEXT;
	i_lplace_id BIGINT;
	i_updated_lplace_id BIGINT;
	t_name TEXT;
	t_addr TEXT;
	f_x double precision;
	f_y double precision;
	
	i_channel_id BIGINT;
	
	a_params TEXT[];
	t_sql TEXT;
	
	eTable TEXT;
	eCol TEXT;
	eDetail TEXT;
	eConstr TEXT;
	
BEGIN
	
	RAISE LOG 'lplace.manage % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	t_action    := cm->>'action';
	i_lplace_id := "utils"."txt2int8"(cm->>'lplace_id');
	t_name      := cm->>'name';
	t_addr      := cm->>'addr';
	f_x         := "utils"."txt2float8"(cm->>'x');
	f_y         := "utils"."txt2float8"(cm->>'y');
	IF t_action IS NULL THEN RETURN error(-1, 'action required'); END IF;
	
	CASE (t_action)
		
		WHEN 'create' THEN
			
			IF t_name IS NULL OR LENGTH(t_name) < 1 THEN RETURN error(-1, 'name required'); END IF;
			IF t_addr IS NULL OR LENGTH(t_addr) < 1 THEN RETURN error(-1, 'addr required'); END IF;
			IF f_x IS NULL THEN RETURN error(-1, 'x required'); END IF;
			IF f_y IS NULL THEN RETURN error(-1, 'y required'); END IF;
			
			PERFORM * FROM "public"."comp_tags" WHERE "comp_id" = i_comp_id AND "tag" = 'shipper'::"comp"."tp_comp_tag";
			IF NOT FOUND THEN RETURN error(-1, format('comp(%s) must have ''shipper'' tag', i_comp_id)); END IF;
			
			INSERT INTO "public"."msg_channels" ("title", "creator_user_id", "type") VALUES (t_name, i_user_id, 'channel'::"channels"."tp_ch_type") RETURNING "channel_id" INTO i_channel_id;
			INSERT INTO "public"."msg_channel_users" ("channel_id", "user_id", "flags") VALUES (i_channel_id, i_user_id, "const"."msg_ch_user_flg__creator"());
			INSERT INTO "lplace"."lplaces" ("comp_id", "channel_id", "name", "addr", "x", "y") VALUES (i_comp_id, i_channel_id, t_name, t_addr, f_x, f_y) RETURNING "id" INTO i_lplace_id;
			
			RETURN json_build_object(
				'lplace_id', i_lplace_id,
				'channel_id', i_channel_id
			);
			
		WHEN 'update' THEN
			
			IF i_lplace_id IS NULL THEN RETURN error(-1, 'lplace_id required'); END IF;
			
			a_params := "utils"."prepare_update"(
				cm,
				'{
					"flags": {"col": "flags", "type": "number"},
					"name":  {"col": "name",  "type": "text"},
					"addr":  {"col": "addr",  "type": "text"},
					"x":     {"col": "x",     "type": "number"},
					"y":     {"col": "y",     "type": "number"}
				}'
			);
			
			IF "utils"."len"(a_params) < 1 THEN RETURN error(-1, 'nothing to update'); END IF;
			
			t_sql := format('UPDATE "lplace"."lplaces" SET %s WHERE "id" = %L AND "comp_id" = %L RETURNING "id"', array_to_string(a_params, ','), i_lplace_id, i_comp_id);
			RAISE LOG 't_sql: %', t_sql;
			EXECUTE t_sql INTO i_updated_lplace_id;
			IF i_updated_lplace_id IS NULL THEN RETURN error(-1, format('lplace(%s) and comp(%s) not found', i_lplace_id, i_comp_id)); END IF;
			
			RETURN json_build_object(
				'lplace_id', i_lplace_id
			);
			
		WHEN 'delete' THEN
			
			IF i_lplace_id IS NULL THEN RETURN error(-1, 'lplace_id required'); END IF;
			
			DELETE FROM "lplace"."lplaces" WHERE "id" = i_lplace_id AND "comp_id" = i_comp_id;
			IF NOT FOUND THEN RETURN error(-1, format('lplace(%s) and comp(%s) not found', i_lplace_id, i_comp_id)); END IF;
			
		ELSE
			
			RETURN error(-1, format('unhandled action(%s)', t_action));
			
	END CASE;
	
	RETURN error(-1, 'unexpected EOF');
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'channels.create failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION lplace.manage(cl json, cm json) OWNER TO cargochat_u;

SET search_path = "order", pg_catalog;

--
-- Name: archive(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION archive(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	i_order_id BIGINT;
	i_archive_id BIGINT;
	
	i_state BIGINT;
	i_shipper_id BIGINT;
	i_exp_comp_id BIGINT;
	i_carrier_id BIGINT;
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'order.archive % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	i_order_id := "utils"."txt2int8"(cm->>'order_id');
	IF i_order_id IS NULL THEN RETURN error(-1, 'order_id required'); END IF;
	
	SELECT "state1", "shipper_comp_id", "exp_comp_id", "carrier_comp_id"
	INTO   i_state,  i_shipper_id,      i_exp_comp_id, i_carrier_id
	FROM "order"."orders"
	WHERE "id" = i_order_id;
	IF NOT FOUND THEN RETURN error(-1, format('order(%s) not found', i_order_id)); END IF;
	
	IF i_state != "order"."order_state_t2i"('done') THEN RETURN error(-1, format('order(%s) not done', i_order_id)); END IF;
	IF NOT (i_comp_id = ANY(ARRAY[i_shipper_id, i_exp_comp_id, i_carrier_id])) THEN RETURN error(-1, format('comp(%s) have no access to order(%s)', i_comp_id, i_order_id)); END IF;
	
	BEGIN
		INSERT INTO "order"."archive" ("order_id", "comp_id") VALUES (i_order_id, i_comp_id) RETURNING "id" INTO i_archive_id;
	EXCEPTION
		WHEN unique_violation THEN RETURN error(-1, 'already archived');
		WHEN OTHERS THEN RAISE;
	END;
	
	RETURN json_build_object(
		'archive_id', i_archive_id
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.archive failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".archive(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: export(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION export(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	iOrderId bigint;
	jOrder json;
	iTotal bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'order.export % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	iOrderId := "utils"."txt2int8"(cm->>'order_id');
	IF iOrderId IS NULL THEN RETURN error(-1, 'order_id required'); END IF;
	
	SELECT "order"."list"(cl, json_build_object(
		'archive', FALSE,
		'fields', ARRAY['id','cid','shid','shname','cargo','opents','lpid','lpname','lpaddr','mass','vol','vtype','ltype','receiver','utime','ltime','expid','expname','addr','note','oid','ovehicle','odriver','ocprice','oeprice','memo'],
		'filters', ARRAY[ARRAY['id','eq',iOrderId::text]]
	)) INTO jOrder;
	
	RAISE LOG 'jOrder: %', jOrder;
	
	IF jOrder IS NULL THEN RETURN error(-1, 'order fetch failed (bad return)'); END IF;
	iTotal := "utils"."txt2int8"(jOrder->>'total');
	IF iTotal IS NULL THEN RETURN error(-1, 'order fetch failed (bad total)'); END IF;
	IF iTotal < 1 THEN RETURN error(-1, format('order(%s) not found', iOrderId)); END IF;
	IF json_typeof(jOrder->'data') != 'array' THEN RETURN error(-1, 'order fetch failed (bad data)'); END IF;
	IF json_array_length(jOrder->'data') < 1 THEN RETURN error(-1, 'order fetch failed (data empty)'); END IF;
	IF json_typeof(jOrder->'data'->0) != 'object' THEN RETURN error(-1, 'order fetch failed (bad order element)'); END IF;
	
	RAISE LOG 'order element: %', jOrder->'data'->0;
	
	RETURN json_build_object(
		'order_id',   iOrderId,
		'order_data', jOrder->'data'->0
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.export failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".export(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: import(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION import(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	--iOrderId bigint;
	
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'order.import % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	--iOrderId := "utils"."txt2int8"(cm->>'order_id');
	--IF iOrderId IS NULL THEN RETURN error(-1, 'order_id required'); END IF;
	
	
	
	
	RETURN json_build_object(
		'order_id',   iOrderId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.import failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".import(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: list(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	a_selection TEXT[] = ARRAY[]::TEXT[];
	a_where TEXT[] = ARRAY[]::TEXT[];
	j_cfg JSON;
	
	-- "id","ts","cid","cname","lpid","lpname","lpaddr","lpx","lpy","mass","vol","vtype","ltype","ltime","utime","receiver","addr","x","y","note","expid","expname"
	
	b_archive boolean;
	
	-- ordering, pagenation
	t_order_by TEXT;
	t_dir TEXT;
	i_offset BIGINT;
	i_limit BIGINT;
	i_xlimit BIGINT;
	
	-- fetching
	c1 REFCURSOR;
	r1 RECORD;
	i_total BIGINT;
	t_query TEXT;
	a_result JSON[] = ARRAY[]::JSON[];
	
	-- error handling
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'orders.list % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, format('user(%s) must have comp', i_user_id)); END IF;
	
	b_archive := "utils"."txt2bool"(cm->>'archive');
	IF b_archive IS NULL THEN RETURN error(-1, 'archive required'); END IF;
	
	t_order_by  := cm->>'orderBy';
	t_dir       := cm->>'dir';
	i_offset    := "utils"."txt2int8"(cm->>'offset');
	i_limit     := "utils"."txt2int8"(cm->>'limit');
	
	j_cfg = format('{
		"default_field": "id",
		"fields": {
			"id":       {"filter": "t.id",               "select": "t.id",                                              "type": "number"},
			"state":    {"filter": "\"order\".\"order_state_i2t\"(t.state1)",  "select": "\"order\".\"order_state_i2t\"(t.state1)",  "alias": "state",  "type": "text"},
			"tname":    {"filter": "t.tname",            "select": "t.tname",                                           "type": "text"},
			"cargo":    {"filter": "t.cargo",            "select": "t.cargo",                                           "type": "text"},
			"createts": {"filter": "t.ctime",            "select": "utils__ts2int(t.ctime)",      "alias": "createts",  "type": "timestamp"},
			"opents":   {"filter": "t.open_ts",          "select": "utils__ts2int(t.open_ts)",    "alias": "opents",    "type": "timestamp"},
			"closets":  {"filter": "t.close_ts",         "select": "utils__ts2int(t.close_ts)",   "alias": "closets",   "type": "timestamp"},
			"cancelts": {"filter": "t.cancel_ts",        "select": "utils__ts2int(t.cancel_ts)",  "alias": "cancelts",  "type": "timestamp"},
			"shipts":   {"filter": "t.ship_ts",          "select": "utils__ts2int(t.ship_ts)",    "alias": "shipts",    "type": "timestamp"},
			"donets":   {"filter": "t.done_ts",          "select": "utils__ts2int(t.done_ts)",    "alias": "donets",    "type": "timestamp"},
			"arhts":    {"filter": "a.ctime",            "select": "utils__ts2int(a.ctime)",      "alias": "arhts",     "type": "timestamp"},
			"cid":      {"filter": "t.comp_id",          "select": "t.comp_id",                   "alias": "cid",       "type": "number"},
			"cname":    {"filter": "c.name",             "select": "c.name",                      "alias": "cname",     "type": "string"},
			"cinn":     {"filter": "c.inn",              "select": "c.inn",                       "alias": "cinn",      "type": "string"},
			"caddr":    {"filter": "c.addr",             "select": "c.addr",                      "alias": "caddr",     "type": "string"},
			"shid":     {"filter": "t.shipper_comp_id",  "select": "t.shipper_comp_id",           "alias": "shid",      "type": "number"},
			"shname":   {"filter": "sh.name",            "select": "sh.name",                     "alias": "shname",    "type": "string"},
			"lpid":     {"filter": "t.lplace_id",        "select": "t.lplace_id",                 "alias": "lpid",      "type": "number"},
			"lpname":   {"filter": "l.name",             "select": "l.name",                      "alias": "lpname",    "type": "string"},
			"lpaddr":   {"filter": "l.addr",             "select": "l.addr",                      "alias": "lpaddr",    "type": "string"},
			"lpx":      {"filter": "l.x",                "select": "l.x",                         "alias": "lpx",       "type": "number"},
			"lpy":      {"filter": "l.y",                "select": "l.y",                         "alias": "lpy",       "type": "number"},
			"mass":     {"filter": "t.mass",             "select": "t.mass",                                            "type": "number"},
			"vol":      {"filter": "t.vol",              "select": "t.vol",                                             "type": "number"},
			"vtype":    {"filter": "t.vtype",            "select": "t.vtype",                                           "type": "text"},
			"ltype":    {"filter": "t.ltype",            "select": "t.ltype",                                           "type": "text"},
			"ltime":    {"filter": "t.ltime",            "select": "utils__ts2int(t.ltime)",      "alias": "ltime",     "type": "timestamp"},
			"utime":    {"filter": "t.utime",            "select": "utils__ts2int(t.utime)",      "alias": "utime",     "type": "timestamp"},
			"receiver": {"filter": "t.receiver",         "select": "t.receiver",                                        "type": "text"},
			"addr":     {"filter": "t.uaddr",            "select": "t.uaddr",                     "alias": "addr",      "type": "text"},
			"x":        {"filter": "t.ux",               "select": "t.ux",                        "alias": "x",         "type": "number"},
			"y":        {"filter": "t.uy",               "select": "t.uy",                        "alias": "y",         "type": "number"},
			"note":     {"filter": "t.note",             "select": "t.note",                                            "type": "text"},
			"expid":    {"filter": "t.exp_comp_id",      "select": "t.exp_comp_id",               "alias": "expid",     "type": "number"},
			"oid":      {"filter": "o.id",               "select": "o.id",                        "alias": "oid",       "type": "number"},
			"ovehicle": {"filter": "o.vehicle_id",       "select": "o.vehicle_id",                "alias": "ovehicle",  "type": "number"},
			"odriver":  {"filter": "o.driver",           "select": "o.driver",                    "alias": "odriver",   "type": "text"},
			"ocprice":  {"filter": "o.cprice",           "select": "o.cprice",                    "alias": "ocprice",   "type": "number"},
			"oeprice":  {"filter": "o.eprice",           "select": "o.eprice",                    "alias": "oeprice",   "type": "number"},
			"crid":     {"filter": "cr.id",              "select": "cr.id",                       "alias": "crid",      "type": "number"},
			"vehicle":  {"filter": "t.vehicle_id",       "select": "t.vehicle_id",                "alias": "vehicle",   "type": "number"},
			"crname":   {"filter": "cr.name",            "select": "cr.name",                     "alias": "crname",    "type": "text"},
			"vid":      {"filter": "t.vehicle_id",       "select": "t.vehicle_id",                "alias": "vid",       "type": "number"},
			"vmodel":   {"filter": "t.vehicle_jdoc->>''model''",  "select": "t.vehicle_jdoc->>''model''",  "alias": "vmodel",  "type": "text"},
			"vnum":     {"filter": "t.vehicle_jdoc->>''num''",    "select": "t.vehicle_jdoc->>''num''",    "alias": "vnum",    "type": "text"},
			"price":    {"filter": "t.price",            "select": "CASE WHEN t.shipper_comp_id != %L THEN t.price ELSE NULL END",  "alias": "price",     "type": "number"},
			"did":      {"filter": "t.driver",           "select": "t.driver",                    "alias": "did",       "type": "number"},
			"dfn":      {"filter": "t.driver_jdoc->>''first_name''",  "select": "t.driver_jdoc->>''first_name''",  "alias": "dfn",  "type": "string"},
			"dln":      {"filter": "t.driver_jdoc->>''last_name''",   "select": "t.driver_jdoc->>''last_name''",   "alias": "dln",  "type": "string"},
			"expname":  {"filter": "e.name",             "select": "e.name",                      "alias": "expname",   "type": "text"},
			"ecveh":    {"filter": "t.ecvehicle",        "select": "t.ecvehicle",                 "alias": "ecveh",     "type": "text"},
			"ectr":     {"filter": "t.ectrailer",        "select": "t.ectrailer",                 "alias": "ectr",      "type": "text"},
			"ecdfio":   {"filter": "t.ecdfio",           "select": "t.ecdfio",                    "alias": "ecdfio",    "type": "text"},
			"ecddoc":   {"filter": "t.ecddoc",           "select": "t.ecddoc",                    "alias": "ecddoc",    "type": "text"},
			"creason":  {"filter": "t.creason",          "select": "t.creason",                                         "type": "text"},
			"memo":     {"filter": "m.memo",             "select": "m.memo",                      "alias": "memo",      "type": "text"}
		}
	}', i_comp_id);
	
	/*
	"vmodel":   {"filter": "v.model",            "select": "v.model",                     "alias": "vmodel",    "type": "text"},
	"vnum":     {"filter": "v.num",              "select": "v.num",                       "alias": "vnum",      "type": "text"},
	"dfn":      {"filter": "d.first_name",       "select": "d.first_name",                "alias": "dfn",       "type": "string"},
	"dln":      {"filter": "d.last_name",        "select": "d.last_name",                 "alias": "dln",       "type": "string"},
	*/
	
	IF t_order_by IS NULL OR (j_cfg->'fields'->t_order_by) IS NULL THEN
		t_order_by = j_cfg->'fields'->(j_cfg->>'default_field')->>'select';
	ELSE
		t_order_by = j_cfg->'fields'->t_order_by->>'select';
	END IF;
	
	IF t_dir IS NULL OR NOT (t_dir = ANY(ARRAY['ASC','DESC'])) THEN t_dir := 'ASC'; END IF;
	IF i_offset IS NULL THEN i_offset = 0; END IF;
	IF i_limit IS NULL THEN i_limit = 50; ELSIF i_limit < 1 THEN i_limit = 1; ELSIF i_limit > 500 THEN i_limit = 500; END IF;
	i_xlimit := i_limit;
	
	a_selection := "utils"."prepare_list_selection"(cm, j_cfg);
	a_where := "utils"."prepare_list_filters"(cm, j_cfg);
	
	-- созданные видны только создателям
	a_where := a_where || format('"t"."state1" != "order"."order_state_t2i"(''created'') OR "t"."comp_id" = %L', i_comp_id);
	-- прочая хренота
	a_where := a_where || format('"t"."state1" = "order"."order_state_t2i"(''opened'') OR "t"."state1" NOT IN ("order"."order_state_t2i"(''closed''), "order"."order_state_t2i"(''shipping''), "order"."order_state_t2i"(''cancelled''), "order"."order_state_t2i"(''done'')) OR "t"."comp_id" = %L OR "t"."exp_comp_id" = %L OR "t"."carrier_comp_id" = %L', i_comp_id, i_comp_id, i_comp_id);
	
	--IF "utils"."len"(a_where) < 1 THEN a_where := a_where || 'TRUE'::TEXT; END IF;
	
	IF b_archive THEN
		
		-- только свой архив
		a_where := a_where || format('"a"."comp_id" = %L', i_comp_id);
		
		t_query := format('
			SELECT %s
			FROM "order"."archive" "a"
			LEFT JOIN "order"."orders"     "t" ON  "t"."id" = "a"."order_id"
			LEFT JOIN "public"."comps"     "c" ON  "c"."id" = "t"."comp_id"
			LEFT JOIN "public"."comps"    "sh" ON "sh"."id" = "t"."shipper_comp_id"
			LEFT JOIN "lplace"."lplaces"   "l" ON  "l"."id" = "t"."lplace_id"
			LEFT JOIN "public"."comps"     "e" ON  "e"."id" = "t"."exp_comp_id"
			LEFT JOIN "order"."offers"     "o" ON  "t"."id" = "o"."order_id" AND "o"."carrier_comp_id" = %L
			LEFT JOIN "public"."comps"    "cr" ON "cr"."id" = "t"."carrier_comp_id"
			LEFT JOIN "order"."memo"       "m" ON  "m"."order_id" = "t"."id" AND "m"."comp_id" = %L
			WHERE (%s)
			ORDER BY %s %s',
			array_to_string(a_selection, ', '),
			i_comp_id, i_comp_id,
			array_to_string(a_where, ') AND ('),
			t_order_by, t_dir
		);
		-- LEFT JOIN "vehicle"."vehicles_head" "v" ON  "v"."id" = "t"."vehicle_id"
		-- LEFT JOIN "public"."users" "d" ON  "d"."id" = "t"."driver"
		
	ELSE
		
		-- архивированные не показываем
		a_where := a_where || format('"a"."comp_id" IS NULL');
		
		t_query := format('
			SELECT %s
			FROM "order"."orders" "t"
			LEFT JOIN "public"."comps"     "c" ON  "c"."id" = "t"."comp_id"
			LEFT JOIN "public"."comps"    "sh" ON "sh"."id" = "t"."shipper_comp_id"
			LEFT JOIN "lplace"."lplaces"   "l" ON  "l"."id" = "t"."lplace_id"
			LEFT JOIN "public"."comps"     "e" ON  "e"."id" = "t"."exp_comp_id"
			LEFT JOIN "order"."offers"     "o" ON  "t"."id" = "o"."order_id" AND "o"."carrier_comp_id" = %L
			LEFT JOIN "public"."comps"    "cr" ON "cr"."id" = "t"."carrier_comp_id"
			LEFT JOIN "order"."memo"       "m" ON  "m"."order_id" = "t"."id" AND "m"."comp_id" = %L
			LEFT JOIN "order"."archive"    "a" ON  "a"."order_id" = "t"."id" AND "a"."comp_id" = %L
			WHERE (%s)
			ORDER BY %s %s',
			array_to_string(a_selection, ', '),
			i_comp_id, i_comp_id, i_comp_id,
			array_to_string(a_where, ') AND ('),
			t_order_by, t_dir
		);
		-- LEFT JOIN "vehicle"."vehicles_head" "v" ON  "v"."id" = "t"."vehicle_id"
		-- LEFT JOIN "public"."users" "d" ON  "d"."id" = "t"."driver"
	
	END IF;
	
	RAISE LOG 't_query: %', t_query;
	
	OPEN c1 FOR EXECUTE t_query;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS i_total = ROW_COUNT;
	RAISE LOG 'i_total=%', i_total;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD i_offset IN c1;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		a_result := a_result || row_to_json(r1);
		IF i_xlimit <= 1 THEN EXIT; END IF;
		i_xlimit := i_xlimit - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total',  i_total,
		'offset', i_offset,
		'limit',  i_limit,
		'uid',    i_user_id,
		'cid',    i_comp_id,
		'data',   array_to_json(a_result)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.list failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: manage(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION manage(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	t_tmp TEXT;
	t_action TEXT;
	t_tname TEXT;
	i_order_id BIGINT;
	i_updated_order_id BIGINT;
	i_shipper BIGINT;
	t_cargo TEXT;
	tpLType "order"."tp_load_type";
	i_lplace_id BIGINT;
	f_mass DOUBLE PRECISION;
	f_vol DOUBLE PRECISION;
	tpVType "vehicle"."tp_vehicle_type";
	ts_ltime TIMESTAMP WITHOUT TIME ZONE;
	ts_utime TIMESTAMP WITHOUT TIME ZONE;
	t_receiver TEXT;
	t_addr TEXT;
	f_x DOUBLE PRECISION;
	f_y DOUBLE PRECISION;
	t_note TEXT;
	i_expeditor BIGINT;
	
	i_lplace_comp_id BIGINT;
	i_lplace_flags BIGINT;
	i_state BIGINT;
	
	j_insert json;
	a_params TEXT[] = ARRAY[]::TEXT[];
	t_sql TEXT;
	
	ts_actual TIMESTAMP WITHOUT TIME ZONE;
	a_sids TEXT[];
	__events__ json[];
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'order.manage % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	t_action    := cm->>'action';
	IF t_action IS NULL THEN RETURN error(-1, 'action required'); END IF;
	
	t_tname     := cm->>'tname';
	i_order_id  := "utils"."txt2int8"(cm->>'order_id');
	i_shipper   := "utils"."txt2int8"(cm->>'shipper');
	t_cargo     := cm->>'cargo';
	i_lplace_id := "utils"."txt2int8"(cm->>'lplace_id');
	
	t_tmp       := cm->>'ltype';
	IF t_tmp IS NOT NULL THEN BEGIN
		tpLType   := t_tmp::"order"."tp_load_type"; EXCEPTION WHEN OTHERS THEN RETURN error(-1, 'invalid ltype'); END;
	END IF;
	
	f_mass      := "utils"."txt2float8"(cm->>'mass');
	f_vol       := "utils"."txt2float8"(cm->>'vol');
	
	t_tmp       := cm->>'vtype';
	IF t_tmp IS NOT NULL THEN BEGIN
		tpVType   := t_tmp::"vehicle"."tp_vehicle_type"; EXCEPTION WHEN OTHERS THEN RETURN error(-1, 'invalid vtype'); END;
	END IF;
	
	ts_ltime    := "utils"."txt2ts"(cm->>'ltime');
	ts_utime    := "utils"."txt2ts"(cm->>'utime');
	t_receiver  := cm->>'receiver';
	t_addr      := cm->>'addr';
	f_x         := "utils"."txt2float8"(cm->>'x');
	f_y         := "utils"."txt2float8"(cm->>'y');
	t_note      := cm->>'note';
	i_expeditor := "utils"."txt2int8"(cm->>'expeditor');
	
	CASE (t_action)
		
		WHEN 'create' THEN
			-- создание
			
			--PERFORM * FROM "public"."comp_tags" WHERE "comp_id" = i_comp_id AND "tag" IN ('shipper'::"comp"."tp_comp_tag", 'expeditor'::"comp"."tp_comp_tag");
			--IF NOT FOUND THEN RETURN error(-1, format('comp(%s) must have ''shipper'' or ''expeditor'' tag', i_comp_id)); END IF;
			
			IF t_cargo     IS NULL THEN RETURN error(-1, 'cargo required'); END IF;
			IF i_shipper   IS NULL THEN RETURN error(-1, 'shipper required'); END IF;
			IF i_lplace_id IS NULL THEN RETURN error(-1, 'lplace_id required'); END IF;
			IF tpLType     IS NULL THEN RETURN error(-1, 'ltype required'); END IF;
			IF f_mass      IS NULL THEN RETURN error(-1, 'mass required'); END IF;
			IF f_vol       IS NULL THEN RETURN error(-1, 'vol required'); END IF;
			IF tpVType     IS NULL THEN RETURN error(-1, 'vtype required'); END IF;
			IF ts_ltime    IS NULL THEN RETURN error(-1, 'ltime required'); END IF;
			IF ts_utime    IS NULL THEN RETURN error(-1, 'utime required'); END IF;
			IF t_receiver  IS NULL OR LENGTH(t_receiver) < 1 THEN RETURN error(-1, 'receiver required'); END IF;
			IF t_addr      IS NULL OR LENGTH(t_addr) < 1     THEN RETURN error(-1, 'addr required'); END IF;
			IF f_x         IS NULL THEN RETURN error(-1, 'x required'); END IF;
			IF f_y         IS NULL THEN RETURN error(-1, 'y required'); END IF;
			--IF t_note IS NULL OR LENGTH(t_note) < 1 THEN RETURN error(-1, 'note required'); END IF;
			IF i_expeditor IS NULL THEN RETURN error(-1, 'expeditor required'); END IF;
			
			IF NOT (i_comp_id = ANY(ARRAY[i_shipper, i_expeditor])) THEN RETURN error(-1, format('comp(%s) must be shipper|expeditor', i_comp_id)); END IF;
			
			SELECT "comp_id", "flags" INTO i_lplace_comp_id, i_lplace_flags FROM "lplace"."lplaces" WHERE "id" = i_lplace_id;
			IF NOT FOUND THEN RETURN error(-1, format('lplace_id(%s) not found', i_lplace_id)); END IF;
			-- доступно создателю места погрузки
			-- доступно экспедитору создателя места погрузки, при включенной флаге
			IF NOT (
				i_lplace_comp_id = i_comp_id
					OR
				(
					"utils"."flgchk"(i_lplace_flags, "lplace"."_flg_lp_orders_for_expeditors"()) = TRUE
						AND
					EXISTS (
						SELECT "relation_id" FROM "public"."comp_relations" WHERE "comp_from" = i_comp_id AND "comp_to" = i_lplace_comp_id AND "relation_type" = 'expedition'
					)
				)
			) THEN RETURN error(-1, format('order create not available for comp(%s) using lplace(%s) owned by comp(%s)', i_comp_id, i_lplace_id, i_lplace_comp_id)); END IF;
			
			-- todo: сделать проверку тегов у компаний триггером
			
			PERFORM * FROM "public"."comp_tags" WHERE "comp_id" = i_shipper AND "tag" = 'shipper'::"comp"."tp_comp_tag";
			IF NOT FOUND THEN RETURN error(-1, format('comp(%s) have no tag(shipper)', i_expeditor)); END IF;
			
			PERFORM * FROM "public"."comp_tags" WHERE "comp_id" = i_expeditor AND "tag" = 'expeditor'::"comp"."tp_comp_tag";
			IF NOT FOUND THEN RETURN error(-1, format('comp(%s) have no tag(expeditor)', i_expeditor)); END IF;
			
			-- todo: сделать проверку тегов у компаний триггером
			
			i_state := "order"."order_state_t2i"('created');
			
			BEGIN
				INSERT INTO "order"."orders"
					("comp_id", "shipper_comp_id", "state1", "lplace_id", "cargo", "ltype", "mass", "vol", "vtype", "ltime",  "utime",  "receiver", "uaddr", "ux", "uy", "note", "exp_comp_id")
				VALUES
					(i_comp_id, i_shipper,         i_state,  i_lplace_id, t_cargo, tpLType, f_mass, f_vol, tpVType, ts_ltime, ts_utime, t_receiver, t_addr,  f_x,  f_y,  t_note, i_expeditor)
				RETURNING "id" INTO i_order_id;
			EXCEPTION
				WHEN OTHERS THEN
					GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME;
					IF e_con = 'orders_lplace_id_fkey' THEN RETURN error(-1, format('invalid lplace(%s)', i_lplace_id)); END IF;
					IF e_con = 'orders_expeditor_comp_id_fkey' THEN RETURN error(-1, format('invalid expeditor(%s)', i_expeditor)); END IF;
					RAISE;
			END;
			
			-- достаем все сессии активные за поледние 48 часов
			-- только юзеров из создающей компании
			ts_actual := timezone('utc'::TEXT, NOW()) - '48 hours'::interval;
			SELECT COALESCE(ARRAY_AGG("s"."sid"), ARRAY[]::TEXT[])
			INTO a_sids
			FROM "public"."sessions" "s"
			LEFT JOIN "public"."users" "u" ON "u"."id" = "s"."user_id"
			WHERE "s"."mtime" > ts_actual AND "u"."comp_id" = i_comp_id;
			
		WHEN 'template' THEN
			-- шаблон
			
			IF t_tname IS NULL OR LENGTH(t_tname) < 1 THEN RETURN error(-1, 'tname required'); END IF;
			
			j_insert := "utils"."prepare_insert"(
				cm,
				'{
					"shipper":    {"col": "shipper_comp_id",    "type": "number"},
					"lplace_id":  {"col": "lplace_id",          "type": "number"},
					"cargo":      {"col": "cargo",              "type": "text"},
					"ltype":      {"col": "ltype",              "type": "text"},
					"mass":       {"col": "mass",               "type": "number"},
					"vol":        {"col": "vol",                "type": "number"},
					"vtype":      {"col": "vtype",              "type": "text"},
					"ltime":      {"col": "ltime",              "type": "ts"},
					"utime":      {"col": "utime",              "type": "ts"},
					"receiver":   {"col": "receiver",           "type": "text"},
					"addr":       {"col": "uaddr",              "type": "text"},
					"x":          {"col": "ux",                 "type": "number"},
					"y":          {"col": "uy",                 "type": "number"},
					"note":       {"col": "note",               "type": "text"},
					"expeditor":  {"col": "exp_comp_id",        "type": "number"}
				}'
			);
			--RAISE LOG 'j_insert: %', j_insert;
			
			t_sql := format(
				'INSERT INTO "order"."orders" ("state1", "comp_id", "tname", %s) VALUES (%L, %L, %L, %s) RETURNING "id"',
				array_to_string("utils"."j2at"(j_insert->0), ','),
				"order"."order_state_t2i"('template'),
				i_comp_id,
				t_tname,
				array_to_string("utils"."j2at"(j_insert->1), ',')
			);
			--RAISE LOG 't_sql: %', t_sql;
			
			BEGIN
				EXECUTE t_sql INTO i_order_id;
			EXCEPTION
				WHEN OTHERS THEN
					GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME;
					IF e_con = 'orders_lplace_id_fkey' THEN RETURN error(-1, format('invalid lplace(%s)', i_lplace_id)); END IF;
					IF e_con = 'orders_expeditor_comp_id_fkey' THEN RETURN error(-1, format('invalid expeditor(%s)', i_expeditor)); END IF;
					RAISE;
			END;
			
			-- никому ничего не шлем
			a_sids := ARRAY[]::TEXT[];
			
		WHEN 'update' THEN
			-- обновление
			
			IF i_order_id IS NULL THEN RETURN error(-1, 'order_id required'); END IF;
			
			a_params := "utils"."prepare_update"(
				cm,
				'{
					"tname":      {"col": "tname",              "type": "text"},
					"shipper":    {"col": "shipper_comp_id",    "type": "number"},
					"lplace_id":  {"col": "lplace_id",          "type": "number"},
					"cargo":      {"col": "cargo",              "type": "text"},
					"ltype":      {"col": "ltype",              "type": "text"},
					"mass":       {"col": "mass",               "type": "number"},
					"vol":        {"col": "vol",                "type": "number"},
					"vtype":      {"col": "vtype",              "type": "text"},
					"ltime":      {"col": "ltime",              "type": "ts"},
					"utime":      {"col": "utime",              "type": "ts"},
					"receiver":   {"col": "receiver",           "type": "text"},
					"addr":       {"col": "uaddr",              "type": "text"},
					"x":          {"col": "ux",                 "type": "number"},
					"y":          {"col": "uy",                 "type": "number"},
					"note":       {"col": "note",               "type": "text"},
					"expeditor":  {"col": "exp_comp_id",        "type": "number"}
				}'
			);
			
			IF "utils"."len"(a_params) < 1 THEN RETURN error(-1, 'fields required'); END IF;
			
			t_sql := format('UPDATE "order"."orders" SET %s WHERE "id" = %L AND "comp_id" = %L RETURNING "id"', array_to_string(a_params, ','), i_order_id, i_comp_id);
			RAISE LOG 't_sql: %', t_sql;
			
			-- todo: сделать проверку тегов у компаний триггером
			-- сейчас при обновлении теги не проверяются !!!
			
			BEGIN
				EXECUTE t_sql INTO i_updated_order_id;
				IF i_updated_order_id IS NULL THEN RETURN error(-1, format('order(%s) and comp(%s) not found', i_order_id, i_comp_id)); END IF;
			EXCEPTION
				WHEN OTHERS THEN
					GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME;
					IF e_con = 'orders_expeditor_comp_id_fkey' THEN RETURN error(-1, format('invalid expeditor(%s)', i_expeditor)); END IF;
					RAISE;
			END;
			
		WHEN 'delete' THEN
			-- удаление
			
			IF i_order_id IS NULL THEN RETURN error(-1, 'order_id required'); END IF;
			
			i_state := NULL;
			DELETE FROM "order"."orders" WHERE "id" = i_order_id AND "comp_id" = i_comp_id;
			IF NOT FOUND THEN RETURN error(-1, format('order(%s) and comp(%s) not found', i_order_id, i_comp_id)); END IF;
			
			-- достаем все сессии активные за поледние 48 часов
			-- только юзеров из удаляющей компании
			ts_actual := timezone('utc'::TEXT, NOW()) - '48 hours'::interval;
			SELECT COALESCE(ARRAY_AGG("s"."sid"), ARRAY[]::TEXT[])
			INTO a_sids
			FROM "public"."sessions" "s"
			LEFT JOIN "public"."users" "u" ON "u"."id" = "s"."user_id"
			WHERE "s"."mtime" > ts_actual AND "u"."comp_id" = i_comp_id;
			
		ELSE
			
			RETURN error(-1, format('unhandled action(%s)', t_action));
			
	END CASE;
	
	IF a_sids IS NULL THEN
		-- ессии не были подготовлены, значит достаем все сессии активные за поледние 48 часов
		ts_actual := timezone('utc'::TEXT, NOW()) - '48 hours'::interval;
		SELECT COALESCE(ARRAY_AGG("sid"), ARRAY[]::TEXT[]) INTO a_sids FROM "public"."sessions" WHERE "mtime" > ts_actual;
		--RAISE LOG 'a_sids: %', a_sids;
	END IF;
	
	IF "utils"."len"(a_sids) > 0 THEN
		__events__ := __events__ || json_build_object(
			'sids',  a_sids,
			'event', json_build_object(
				'type',     'order_flow',
				'order_id', i_order_id,
				'state',    "order"."order_state_i2t"(i_state)
			)
		);
	END IF;
	
	RETURN json_build_object(
		'order_id',   i_order_id,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.create failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".manage(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: memo(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION memo(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	iOrderId bigint;
	tMemo text;
	iMemoId bigint;
	
	--tpState "order"."tp_state";
	iShipperId bigint;
	iExpCompId bigint;
	iCarrierId bigint;
	
	tsActual timestamp without time zone;
	aSids text[];
	jEvent json;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'order.memo % %', cl, cm;
	
	iUserId := "utils"."txt2int8"(cl->>'user_id');
	iCompId := "utils"."txt2int8"(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	iOrderId  := "utils"."txt2int8"(cm->>'order_id');
	tMemo     := cm->>'memo';
	IF iOrderId IS NULL THEN RETURN error(-1, 'order_id required'); END IF;
	--IF tMemo IS NULL THEN RETURN error(-1, 'memo required'); END IF;
	IF tMemo = '' THEN tMemo := NULL; END IF;
	
	SELECT "shipper_comp_id", "exp_comp_id", "carrier_comp_id"
	INTO   iShipperId,        iExpCompId,    iCarrierId
	FROM "order"."orders"
	WHERE "id" = iOrderId;
	IF NOT FOUND THEN RETURN error(-1, format('order(%s) not found', iOrderId)); END IF;
	
	-- безсмысленно запрещать делать memo по состоянию
	--IF tpState != 'closed'::"order"."tp_state" THEN RETURN error(-1, format('order(%s) not closed', iOrderId)); END IF;
	
	IF iCompId = ANY(ARRAY[iShipperId, iExpCompId, iCarrierId]) THEN
		BEGIN
			INSERT INTO "order"."memo" ("order_id", "comp_id", "memo") VALUES (iOrderId, iCompId, tMemo) RETURNING "id" INTO iMemoId;
		EXCEPTION
			WHEN unique_violation THEN NULL;
			WHEN OTHERS THEN RAISE;
		END;
		IF iMemoId IS NULL THEN
			UPDATE "order"."memo" SET "memo" = tMemo WHERE "order_id" = iOrderId AND "comp_id" = iCompId RETURNING "id" INTO iMemoId;
		END IF;
		IF iMemoId IS NULL THEN RETURN error(-1, 'memo failed'); END IF;
	ELSE
		RETURN error(-1, format('comp(%s) have no access to order(%s)', iCompId, iOrderId));
	END IF;
	
	RETURN json_build_object(
		'memo_id', iMemoId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.memo failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%" stack=%', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".memo(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: offer_bid(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION offer_bid(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	i_offer_id BIGINT;
	f_price DOUBLE PRECISION;
	
	i_order_id BIGINT;
	i_carrier_comp_id BIGINT;
	i_oder_exp_comp_id BIGINT;
	f_cprice DOUBLE PRECISION;
	f_eprice DOUBLE PRECISION;
	f_dprice DOUBLE PRECISION;
	i_vehicle_id BIGINT;
	i_driver BIGINT;
	i_state BIGINT;
	
	ts_actual TIMESTAMP WITHOUT TIME ZONE;
	a_sids TEXT[];
	__events__ JSON[];
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'order.offer_bid % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	i_offer_id := "utils"."txt2int8"(cm->>'offer_id');
	f_price    := "utils"."txt2float8"(cm->>'price');
	IF i_offer_id IS NULL THEN RETURN error(-1, 'offer_id required'); END IF;
	IF f_price    IS NULL THEN RETURN error(-1, 'price required'); END IF;
	
	SELECT "order_id", "carrier_comp_id", "cprice", "eprice", "vehicle_id", "driver"
	INTO i_order_id,   i_carrier_comp_id, f_cprice, f_eprice, i_vehicle_id, i_driver
	FROM "order"."offers"
	WHERE "id" = i_offer_id;
	IF NOT FOUND THEN RETURN error(-1, format('offer(%s) not found', i_offer_id)); END IF;
	
	SELECT "exp_comp_id"
	INTO   i_oder_exp_comp_id
	FROM "order"."orders"
	WHERE "id" = i_order_id AND "state1" = "order"."order_state_t2i"('opened');
	IF NOT FOUND THEN RETURN error(-1, format('order(%s) not found or not opened', i_order_id)); END IF;
	
	IF i_comp_id = i_carrier_comp_id THEN  -- ход перевозчика
		IF f_cprice IS NOT NULL THEN RETURN error(-1, format('now is expeditor(%s) turn', i_oder_exp_comp_id)); END IF;
		f_dprice := f_price - f_eprice;
		UPDATE "order"."offers" SET "cprice" = f_price, "eprice" = NULL WHERE "id" = i_offer_id;
	ELSIF i_comp_id = i_oder_exp_comp_id THEN  -- ход экспедитора
		IF f_eprice IS NOT NULL THEN RETURN error(-1, format('now is carrier(%s) turn', i_carrier_comp_id)); END IF;
		f_dprice := f_price - f_cprice;
		UPDATE "order"."offers" SET "cprice" = NULL, "eprice" = f_price WHERE "id" = i_offer_id;
	ELSE  -- кто то лезет без спроса
		RETURN error(-1, format('comp(%s) have not access to offer(%s) of order(%s)', i_comp_id, i_offer_id, i_order_id));
	END IF;
	
	IF ABS(f_dprice) < 0.001 THEN  -- цены совпали
		
		-- закрываем заявку
		i_state := "order"."order_state_t2i"('closed');
		UPDATE "order"."orders" SET
			"state1"          = i_state,
			"close_ts"        = timezone('utc'::TEXT, NOW()),
			"carrier_comp_id" = i_carrier_comp_id,
			"vehicle_id"      = i_vehicle_id,
			"vehicle_jdoc"    = (SELECT json_build_object('id', "id", 'model', "model", 'num', "num") FROM "vehicle"."vehicles_head" WHERE "id" = i_vehicle_id),
			"driver"          = i_driver,
			"driver_jdoc"     = (SELECT json_build_object('id', "id", 'first_name', "first_name", 'last_name', "last_name") FROM "public"."users" WHERE "id" = i_driver),
			"price"           = f_price
		WHERE "id" = i_order_id;
		
		DELETE FROM "order"."offers" WHERE "order_id" = i_order_id;  -- удаляем все предложения по этой заявке
		
		ts_actual := timezone('utc'::TEXT, NOW()) - '48 hours'::interval;
		SELECT ARRAY_AGG("sid") INTO a_sids FROM "public"."sessions" WHERE mtime > ts_actual;
		
		IF "utils"."len"(a_sids) > 0 THEN
			__events__ := __events__ ||
			json_build_object(
				'sids', a_sids,
				'event', json_build_object(
					'type',     'order_flow',
					'order_id', i_order_id,
					'state',    "order"."order_state_i2t"(i_state)
				)
			);
		END IF;
		
	ELSE  -- цены разные, очередной ход торгов
		
		ts_actual := timezone('utc'::TEXT, NOW()) - '48 hours'::interval;
		SELECT COALESCE(ARRAY_AGG("s"."sid"), ARRAY[]::TEXT[])
		INTO a_sids
		FROM "public"."sessions" "s"
		LEFT JOIN "public"."users" "u" ON "u"."id" = "s"."user_id"
		WHERE "s"."mtime" > ts_actual AND "u"."comp_id" IN (i_carrier_comp_id, i_oder_exp_comp_id);  -- торги дотупны только перевозу и экспу (todo: грузовладелец может видеть кол-во активных перевозов)
		
		IF "utils"."len"(a_sids) > 0 THEN
			__events__ := __events__ ||
			json_build_object(
				'sids', a_sids,
				'event', json_build_object(
					'type',     'order_offer_flow',
					'order_id', i_order_id,
					'offer_id', i_offer_id
				)
			);
		END IF;
		
	END IF;
	
	RETURN json_build_object(
		'offer_id',   i_offer_id,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.offer_bid failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".offer_bid(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: offer_create(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION offer_create(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	i_order_id BIGINT;
	i_vehicle_id BIGINT;
	i_driver BIGINT;
	f_price DOUBLE PRECISION;
	
	iOrderCompId BIGINT;
	iOrderExpCompId BIGINT;
	i_offer_id BIGINT;
	
	ts_actual TIMESTAMP WITHOUT TIME ZONE;
	a_sids TEXT[];
	__events__ JSON[];
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'order.offer_create % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	i_order_id   := "utils"."txt2int8"(cm->>'order_id');
	i_vehicle_id := "utils"."txt2int8"(cm->>'vehicle_id');
	i_driver     := "utils"."txt2int8"(cm->>'driver_id');
	f_price      := "utils"."txt2float8"(cm->>'price');
	IF i_order_id   IS NULL THEN RETURN error(-1, 'order_id required'); END IF;
	IF i_vehicle_id IS NULL THEN RETURN error(-1, 'vehicle_id required'); END IF;
	IF i_driver     IS NULL THEN RETURN error(-1, 'driver_id required'); END IF;
	IF f_price      IS NULL THEN RETURN error(-1, 'price required'); END IF;
	
	SELECT "comp_id", "exp_comp_id" INTO iOrderCompId, iOrderExpCompId FROM "order"."orders" WHERE "id" = i_order_id AND "state1" = "order"."order_state_t2i"('opened');
	IF NOT FOUND THEN RETURN error(-1, format('order(%s) not found or not opened', i_order_id)); END IF;
	
	PERFORM "id" FROM "vehicle"."vehicles_head" WHERE "id" = i_vehicle_id AND "comp_id" = i_comp_id;
	IF NOT FOUND THEN RETURN error(-1, format('comp(%s) have no vehicle(%s)', i_comp_id, i_vehicle_id)); END IF;
	
	PERFORM "id" FROM "public"."users" WHERE "id" = i_driver AND "comp_id" = i_comp_id;
	IF NOT FOUND THEN RETURN error(-1, format('user(%s) not in comp(%s)', i_driver, i_comp_id)); END IF;
	
	BEGIN
		INSERT INTO "order"."offers" (
			"order_id",
			"carrier_comp_id",
			"vehicle_id",
			"driver",
			"cprice"
		) VALUES (
			i_order_id,
			i_comp_id,
			i_vehicle_id,
			i_driver,
			f_price
		) RETURNING "id" INTO i_offer_id;
	EXCEPTION
		WHEN OTHERS THEN
			GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
			IF e_con = 'offers_order_id_carrier_comp_id_idx' THEN RETURN error(-1, format('order(%s) already have offer from comp(%s)', i_order_id, i_comp_id)); END IF;
			RAISE;
	END;
	
	-- достаем все сессии активные за поледние 48 часов
	-- только юзеров из компании создающей предложение
	ts_actual := timezone('utc'::TEXT, NOW()) - '48 hours'::INTERVAL;
	SELECT COALESCE(ARRAY_AGG("s"."sid"), ARRAY[]::TEXT[])
	INTO a_sids
	FROM "public"."sessions" "s"
	LEFT JOIN "public"."users" "u" ON "u"."id" = "s"."user_id"
	WHERE "s"."mtime" > ts_actual AND "u"."comp_id" IN (i_comp_id, iOrderCompId, iOrderExpCompId);
	
	IF "utils"."len"(a_sids) > 0 THEN
		__events__ := __events__ || json_build_object(
			'sids', a_sids,
			'event', json_build_object(
				'type',     'order_offer_flow',
				'order_id', i_order_id,
				'offer_id', i_offer_id
			)
		);
	END IF;
	
	RETURN json_build_object(
		'offer_id',   i_offer_id,
		'order_id',   i_order_id,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN OTHERS THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.offer_create failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".offer_create(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: offers_list(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION offers_list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	a_selection TEXT[] = ARRAY[]::TEXT[];
	a_where TEXT[] = ARRAY[]::TEXT[];
	
	j_cfg JSON = '{
		"default_field": "id",
		"fields": {
			"id":       {"filter": "t.id",               "select": "t.id",                                         "type": "number"},
			"ts":       {"filter": "t.ctime",            "select": "utils__ts2int(t.ctime)",  "alias": "ts",       "type": "timestamp"},
			"oid":      {"filter": "t.order_id",         "select": "t.order_id",              "alias": "oid",      "type": "number"},
			"cid":      {"filter": "t.carrier_comp_id",  "select": "t.carrier_comp_id",       "alias": "cid",      "type": "number"},
			"cname":    {"filter": "c.name",             "select": "c.name",                  "alias": "cname",    "type": "string"},
			"vid":      {"filter": "t.vehicle_id",       "select": "t.vehicle_id",            "alias": "vid",      "type": "number"},
			"vmodel":   {"filter": "v.model",            "select": "v.model",                 "alias": "vmodel",   "type": "string"},
			"vnum":     {"filter": "v.num",              "select": "v.num",                   "alias": "vnum",     "type": "string"},
			"did":      {"filter": "t.driver",           "select": "t.driver",                "alias": "did",      "type": "number"},
			"dfn":      {"filter": "d.first_name",       "select": "d.first_name",            "alias": "dfn",      "type": "string"},
			"dln":      {"filter": "d.last_name",        "select": "d.last_name",             "alias": "dln",      "type": "string"},
			"cprice":   {"filter": "t.cprice",           "select": "t.cprice",                                     "type": "number"},
			"eprice":   {"filter": "t.eprice",           "select": "t.eprice",                                     "type": "number"}
		}
	}';
	
	-- ordering, pagenation
	t_order_by TEXT;
	t_dir TEXT;
	i_offset BIGINT;
	i_limit BIGINT;
	i_xlimit BIGINT;
	
	-- fetching
	c1 REFCURSOR;
	r1 RECORD;
	i_total BIGINT;
	t_query TEXT;
	a_result JSON[] = ARRAY[]::JSON[];
	
	-- error handling
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'order.offers_list % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, format('user(%s) must have comp', i_user_id)); END IF;
	
	t_order_by  := cm->>'orderBy';
	t_dir       := cm->>'dir';
	i_offset    := "utils"."txt2int8"(cm->>'offset');
	i_limit     := "utils"."txt2int8"(cm->>'limit');
	
	IF t_order_by IS NULL OR (j_cfg->'fields'->t_order_by) IS NULL THEN
		t_order_by = j_cfg->'fields'->(j_cfg->>'default_field')->>'select';
	ELSE
		t_order_by = j_cfg->'fields'->t_order_by->>'select';
	END IF;
	
	IF t_dir IS NULL OR NOT (t_dir = ANY(ARRAY['ASC','DESC'])) THEN t_dir := 'ASC'; END IF;
	IF i_offset IS NULL THEN i_offset = 0; END IF;
	IF i_limit IS NULL THEN i_limit = 50; ELSIF i_limit < 1 THEN i_limit = 1; ELSIF i_limit > 500 THEN i_limit = 500; END IF;
	i_xlimit := i_limit;
	
	a_selection := "utils"."prepare_list_selection"(cm, j_cfg);
	a_where := "utils"."prepare_list_filters"(cm, j_cfg);
	
	a_where := a_where || format('"t"."carrier_comp_id" = %L OR "o"."exp_comp_id" = %L', i_comp_id, i_comp_id);   -- доступно только перевозу или экспу
	IF "utils"."len"(a_where) < 1 THEN a_where := a_where || 'TRUE'::TEXT; END IF;
	
	t_query := format('
		SELECT %s
		FROM "order"."offers" "t"
		LEFT JOIN "public"."comps"    "c" ON "c"."id" = "t"."carrier_comp_id"
		LEFT JOIN "order"."orders"    "o" ON "o"."id" = "t"."order_id"
		LEFT JOIN "vehicle"."vehicles_head" "v" ON "v"."id" = "t"."vehicle_id"
		LEFT JOIN "public"."users"    "d" ON "d"."id" = "t"."driver"
		WHERE (%s)
		ORDER BY %s %s',
		array_to_string(a_selection, ', '),
		array_to_string(a_where, ') AND ('),
		t_order_by, t_dir
	);
	
	RAISE LOG 't_query: %', t_query;
	
	OPEN c1 FOR EXECUTE t_query;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS i_total = ROW_COUNT;
	RAISE LOG 'i_total=%', i_total;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD i_offset IN c1;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		a_result := a_result || row_to_json(r1);
		IF i_xlimit <= 1 THEN EXIT; END IF;
		i_xlimit := i_xlimit - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total',  i_total,
		'offset', i_offset,
		'limit',  i_limit,
		'uid',    i_user_id,
		'cid',    i_comp_id,
		'data',   array_to_json(a_result)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.offers_list failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".offers_list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: order_state_i2t(bigint); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION order_state_i2t(v bigint) RETURNS text
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	CASE (v)
		WHEN 1 THEN RETURN 'created';
		WHEN 2 THEN RETURN 'opened';
		WHEN 3 THEN RETURN 'shipping';
		WHEN 4 THEN RETURN 'canceled';
		WHEN 5 THEN RETURN 'done';
		WHEN 6 THEN RETURN 'closed';
		WHEN 7 THEN RETURN 'template';
		ELSE RETURN NULL;
	END CASE;
	RETURN NULL;
END;
$$;


ALTER FUNCTION "order".order_state_i2t(v bigint) OWNER TO cargochat_u;

--
-- Name: order_state_t2i(text); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION order_state_t2i(v text) RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	CASE (v)
		WHEN 'created'   THEN RETURN 1;
		WHEN 'opened'    THEN RETURN 2;
		WHEN 'shipping'  THEN RETURN 3;
		WHEN 'canceled'  THEN RETURN 4;
		WHEN 'done'      THEN RETURN 5;
		WHEN 'closed'    THEN RETURN 6;
		WHEN 'template'  THEN RETURN 7;
		ELSE RETURN NULL;
	END CASE;
	RETURN NULL;
END;
$$;


ALTER FUNCTION "order".order_state_t2i(v text) OWNER TO cargochat_u;

--
-- Name: state_close(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION state_close(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id bigint;
	i_comp_id bigint;
	
	i_order_id bigint;
	t_vehicle text;
	t_trailer text;
	t_dfio text;
	t_ddoc text;
	f_price double precision;
	
	i_state_prev bigint;
	i_order_comp_id bigint;  -- создатель заказа
	i_order_shipper_comp_id bigint;  -- грузовладелец заказа
	i_order_exp_comp_id bigint;  -- экспедитор заказа
	
	ts_actual timestamp without time zone;
	a_sids text[];
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'order.state_close % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	/*
		{
	 "cm":       "order_state_close",
	 "sid":      <(string) sid>,
	 "order_id": <(number) id заказа>,
	 "vehicle":  <(string) данные ТС>,
	 "trailer":  <(string) данные прицепа (опция)>,
	 "dfio":     <(string) ФИО водителя>,
	 "ddoc":     <(string) документы водителя>,
	 "price":    <(number) сумма сделки>
	}
	{
	 "order_id": <(number) id измененного заказа>
	}
	*/
	
	i_order_id := "utils"."txt2int8"(cm->>'order_id');
	t_vehicle  := cm->>'vehicle';
	t_trailer  := cm->>'trailer';
	t_dfio     := cm->>'dfio';
	t_ddoc     := cm->>'ddoc';
	f_price    := "utils"."txt2float8"(cm->>'price');
	IF i_order_id IS NULL THEN RETURN error(-1, 'order_id required'); END IF;
	IF t_vehicle IS NULL THEN RETURN error(-1, 'vehicle required'); END IF;
	--IF t_trailer IS NULL THEN RETURN error(-1, 'trailer required'); END IF;
	IF t_dfio IS NULL THEN RETURN error(-1, 'dfio required'); END IF;
	IF t_ddoc IS NULL THEN RETURN error(-1, 'ddoc required'); END IF;
	--IF f_price IS NULL THEN RETURN error(-1, 'price required'); END IF;
	
	SELECT "state1", "comp_id", "shipper_comp_id", "exp_comp_id"
	INTO i_state_prev, i_order_comp_id, i_order_shipper_comp_id, i_order_exp_comp_id
	FROM "order"."orders"
	WHERE "id" = i_order_id;
	IF NOT FOUND THEN RETURN error(-1, format('order(%s) not found', i_order_id)); END IF;
	
	IF COALESCE(i_comp_id = i_order_exp_comp_id, FALSE) IS FALSE THEN RETURN error(-1, format('comp(%s) cant close order(%s)', i_comp_id, i_order_id)); END IF;
	
	IF i_state_prev = "order"."order_state_t2i"('created') THEN
		-- закрывается созданный заказ
		
		ts_actual := timezone('utc'::TEXT, NOW()) - '48 hours'::INTERVAL;
		SELECT COALESCE(ARRAY_AGG("s"."sid"), ARRAY[]::TEXT[])
		INTO a_sids
		FROM "public"."sessions" "s"
		LEFT JOIN "public"."users" "u" ON "u"."id" = "s"."user_id"
		WHERE "s"."mtime" > ts_actual AND "u"."comp_id" IN (i_order_comp_id, i_order_shipper_comp_id, i_order_exp_comp_id);
		
	ELSIF i_state_prev = "order"."order_state_t2i"('opened') THEN
		-- закрывается открытый заказ
		
		ts_actual := timezone('utc'::TEXT, NOW()) - '48 hours'::INTERVAL;
		SELECT COALESCE(ARRAY_AGG("s"."sid"), ARRAY[]::TEXT[])
		INTO a_sids
		FROM "public"."sessions" "s"
		LEFT JOIN "public"."users" "u" ON "u"."id" = "s"."user_id"
		WHERE "s"."mtime" > ts_actual;
		
	ELSE
		-- неверное состояние заказа для закрытия
		RETURN error(-1, format('order(%s) in wrong state(%s) for closing', i_order_id, "order"."order_state_i2t"(i_state_prev)));
	END IF;
	
	-- закрываем заказ
	UPDATE "order"."orders" SET
		"state1"     = "order"."order_state_t2i"('closed'),
		"close_ts"   = timezone('utc'::text, now()),
		"price"      = f_price,
		"ecvehicle"  = t_vehicle,
		"ectrailer"  = t_trailer,
		"ecdfio"     = t_dfio,
		"ecddoc"     = t_ddoc
	WHERE "id" = i_order_id;
	
	IF a_sids IS NOT NULL THEN
		__events__ := __events__ || json_build_object(
			'sids', a_sids,
			'event', json_build_object(
				'type',     'order_flow',
				'order_id', i_order_id,
				'state',    "order"."order_state_i2t"("order"."order_state_t2i"('closed'))
			)
		);
	END IF;
	
	RETURN json_build_object(
		'order_id',   i_order_id,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.state_close failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%" stack=%s', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".state_close(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: state_flow(json, json); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION state_flow(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	i_order_id BIGINT;
	t_state TEXT;
	ts_time TIMESTAMP WITHOUT TIME ZONE;
	t_reason TEXT;
	i_state_new BIGINT;
	i_state_prev BIGINT;
	i_order_comp_id BIGINT;     -- создатель заявки
	i_order_exp_comp_id BIGINT;  -- экспедитор заявки
	i_order_carr_comp_id BIGINT;  -- перевозчик заявки
	i_lplace_id BIGINT;
	
	b_oo_changed BOOLEAN;
	i_opened_orders_cnt BIGINT;
	i_channel_id BIGINT;
	
	ts_actual TIMESTAMP WITHOUT TIME ZONE = timezone('utc'::TEXT, NOW()) - '48 hours'::INTERVAL;
	a_sids TEXT[];
	__events__ JSON[];
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'order.state_flow % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, 'invalid comp'); END IF;
	
	i_order_id := "utils"."txt2int8"(cm->>'order_id');
	t_state   := cm->>'state';
	ts_time   := "utils"."txt2ts"(cm->>'time');
	t_reason  := cm->>'reason';
	IF i_order_id IS NULL THEN RETURN error(-1, 'order_id required'); END IF;
	IF t_state IS NULL THEN RETURN error(-1, 'state required'); END IF;
	IF ts_time IS NULL THEN ts_time := timezone('utc'::TEXT, now()); END IF;
	i_state_new := "order"."order_state_t2i"(t_state);
	IF i_state_new IS NULL THEN RETURN error(-1, format('invalid state(%s)', t_state)); END IF;
	
	SELECT "o"."state1", "o"."comp_id",   "o"."exp_comp_id",   "o"."carrier_comp_id", "o"."lplace_id", "lp"."channel_id"
	INTO   i_state_prev, i_order_comp_id, i_order_exp_comp_id, i_order_carr_comp_id,  i_lplace_id,     i_channel_id
	FROM "order"."orders" "o"
	LEFT JOIN "lplace"."lplaces" "lp" ON "lp"."id" = "o"."lplace_id"
	WHERE "o"."id" = i_order_id;
	IF NOT FOUND THEN RETURN error(-1, format('order(%s) not found', i_order_id)); END IF;
	
	IF i_state_prev = "order"."order_state_t2i"('created') AND i_state_new = "order"."order_state_t2i"('opened') THEN
		-- размещение
		
		IF i_order_comp_id != i_comp_id THEN RETURN error(-1, format('comp(%s) cant open order(%s) because owner is comp(%s)', i_comp_id, i_order_id, i_order_comp_id)); END IF;
		UPDATE "order"."orders" SET "state1" = i_state_new, "open_ts" = timezone('utc'::TEXT, now()) WHERE "id" = i_order_id;
		
		b_oo_changed := TRUE;
		
	ELSIF i_state_prev = "order"."order_state_t2i"('opened') AND i_state_new = "order"."order_state_t2i"('created') THEN
		-- снятие
		
		IF i_order_comp_id != i_comp_id THEN RETURN error(-1, format('comp(%s) cant open order(%s) because owner is comp(%s)', i_comp_id, i_order_id, i_order_comp_id)); END IF;
		UPDATE "order"."orders" SET "state1" = i_state_new WHERE "id" = i_order_id;
		DELETE FROM "order"."offers" WHERE "order_id" = i_order_id;  -- удаляем все предложения по этой заявке
		
		b_oo_changed := TRUE;
		
	ELSIF i_state_prev = "order"."order_state_t2i"('closed') AND i_state_new = "order"."order_state_t2i"('canceled') THEN
		-- отмена
		
		IF t_reason IS NULL THEN RETURN error(-1, 'reason required'); END IF;
		IF NOT (i_comp_id = ANY(ARRAY[i_order_comp_id, i_order_exp_comp_id, i_order_carr_comp_id])) THEN RETURN error(-1, format('comp(%s) cant cancel order(%s) (%s)', i_comp_id, i_order_id, ARRAY[i_order_comp_id, i_order_exp_comp_id, i_order_carr_comp_id])); END IF;
		UPDATE "order"."orders" SET "state1" = i_state_new, "cancel_ts" = timezone('utc'::TEXT, now()), "creason" = t_reason WHERE "id" = i_order_id;
		DELETE FROM "order"."offers" WHERE "order_id" = i_order_id;  -- удаляем все предложения по этой заявке
		
		-- только сиды юзерв которые в компаниях которые принимают учатие в сделке
		SELECT COALESCE(ARRAY_AGG("s"."sid"), ARRAY[]::TEXT[]) INTO a_sids
		FROM "public"."sessions" "s"
		LEFT JOIN "public"."users" "u" ON "u"."id" = "s"."user_id"
		WHERE "s"."mtime" > ts_actual AND "u"."comp_id" IN (i_order_comp_id, i_order_exp_comp_id, i_order_carr_comp_id);
		
	ELSIF i_state_prev = "order"."order_state_t2i"('closed') AND i_state_new = "order"."order_state_t2i"('shipping') THEN
		-- перевозка
		
		IF NOT (i_comp_id = ANY(ARRAY[i_order_exp_comp_id, i_order_carr_comp_id])) THEN RETURN error(-1, format('comp(%s) cant ship order(%s)', i_comp_id, i_order_id)); END IF;
		UPDATE "order"."orders" SET "state1" = i_state_new, "ship_ts" = ts_time, "creason" = t_reason WHERE "id" = i_order_id;
		DELETE FROM "order"."offers" WHERE "order_id" = i_order_id;  -- удаляем все предложения по этой заявке
		
		-- только сиды юзерв которые в компаниях которые принимают учатие в сделке
		SELECT COALESCE(ARRAY_AGG("s"."sid"), ARRAY[]::TEXT[]) INTO a_sids
		FROM "public"."sessions" "s"
		LEFT JOIN "public"."users" "u" ON "u"."id" = "s"."user_id"
		WHERE "s"."mtime" > ts_actual AND "u"."comp_id" IN (i_order_comp_id, i_order_exp_comp_id, i_order_carr_comp_id);
		
	ELSIF i_state_prev = "order"."order_state_t2i"('shipping') AND i_state_new = "order"."order_state_t2i"('done') THEN
		-- доставлено
		
		IF NOT (i_comp_id = ANY(ARRAY[i_order_exp_comp_id, i_order_carr_comp_id])) THEN RETURN error(-1, format('comp(%s) cant done order(%s)', i_comp_id, i_order_id)); END IF;
		UPDATE "order"."orders" SET "state1" = i_state_new, "done_ts" = ts_time WHERE "id" = i_order_id;
		
		-- только сиды юзерв которые в компаниях которые принимают учатие в сделке
		SELECT COALESCE(ARRAY_AGG("s"."sid"), ARRAY[]::TEXT[]) INTO a_sids
		FROM "public"."sessions" "s"
		LEFT JOIN "public"."users" "u" ON "u"."id" = "s"."user_id"
		WHERE "s"."mtime" > ts_actual AND "u"."comp_id" IN (i_order_comp_id, i_order_exp_comp_id, i_order_carr_comp_id);
		
	ELSE
		RETURN error(-1, format('unhandled order(%s) state flow (from ''%s'' to ''%s'')', i_order_id, "order"."order_state_i2t"(i_state_prev), "order"."order_state_i2t"(i_state_new)));
	END IF;
	
	IF a_sids IS NULL THEN  -- сиды заранее не выбраны, значит все юзеры
		-- достаем все сессии активные за поледние 48 часов
		SELECT ARRAY_AGG("sid") INTO a_sids FROM "public"."sessions" WHERE "mtime" > ts_actual;
		--RAISE LOG 'a_sids: %', a_sids;
	END IF;
	
	IF a_sids IS NOT NULL THEN
		__events__ := __events__ || json_build_object(
			'sids',  a_sids,
			'event', json_build_object(
				'type',     'order_flow',
				'order_id', i_order_id,
				'state',    "order"."order_state_i2t"(i_state_new)
			)
		);
	END IF;
	
	IF b_oo_changed IS TRUE THEN
		-- изменилось количество открытых заказов
		
		-- рассылка обновления кол-ва открытых заказов в канале места погрузки
		IF i_lplace_id IS NOT NULL AND i_channel_id IS NOT NULL THEN
			SELECT "opened_orders_cnt" INTO i_opened_orders_cnt FROM "lplace"."lplaces" WHERE "id" = i_lplace_id;
			IF FOUND THEN
				
				-- достаем сессии юзеров которые сейчас сидят в канале
				SELECT ARRAY_AGG("s"."sid") INTO a_sids
				FROM "public"."msg_channel_users" "u"
				LEFT JOIN "public"."sessions" "s" ON "s"."user_id" = "u"."user_id"
				WHERE "u"."channel_id" = i_channel_id AND "s"."mtime" > ts_actual;
				
				IF "utils"."len"(a_sids) > 0 THEN
					__events__ := __events__ || json_build_object(
						'sids',  a_sids,
						'event', json_build_object(
							'type',      'msg_channel_orders',
							'channel_id', i_channel_id,
							'orders',     i_opened_orders_cnt
						)
					);
				END IF;
				
			END IF;
		END IF;
		
	END IF;
	
	RETURN json_build_object(
		'order_id',   i_order_id,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.state_flow failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "order".state_flow(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: trigger_orders_after_state(); Type: FUNCTION; Schema: order; Owner: cargochat_u
--

CREATE FUNCTION trigger_orders_after_state() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	--RAISE LOG 'user.trigger_orders_after_state: TG_OP=% TG_WHEN=%', TG_OP, TG_WHEN;
	
	CASE (TG_WHEN)
		
		WHEN 'AFTER' THEN
			CASE (TG_OP)
				
				WHEN 'INSERT' THEN
					RAISE LOG 'order.trigger_orders_after_state: TG_OP=% TG_WHEN=% NEW=%', TG_OP, TG_WHEN, NEW;
					-- order.trigger_orders_after_state: TG_OP=INSERT TG_WHEN=AFTER NEW=(78,"2015-10-25 07:44:42.865369",17,back,111,222,refrigerator,"2015-10-28 00:00:00","2015-10-30 00:00:00",receiver1,"Соединённые Штаты Америки, Айдахо, Лата, Москоу",-117.000535,46.732349,350,note1,283,cargo1,,,,,,350,,,,,,1,,,,,,,)
					-- новый заказ
					
					IF NEW."lplace_id" IS NOT NULL THEN
						-- есть место погрузки
						IF COALESCE(NEW."state1" = "order"."order_state_t2i"('opened'), FALSE) THEN
							-- новый заказ со статусом "открыт"
							UPDATE "lplace"."lplaces" SET "opened_orders_cnt" = "opened_orders_cnt" + 1 WHERE "id" = NEW."lplace_id";
						END IF;
					END IF;
					
					RETURN NEW;
					
				WHEN 'UPDATE' THEN
					RAISE LOG 'order.trigger_orders_after_state: TG_OP=% TG_WHEN=% OLD=% NEW=%', TG_OP, TG_WHEN, OLD, NEW;
					-- order.trigger_orders_after_state: TG_OP=UPDATE TG_WHEN=AFTER OLD=(77,"2015-10-24 14:20:00.858492",16,back,20,82,closed,"2015-10-25 01:00:00","2015-10-29 02:00:00","ООО Комус-Поволжье","Россия, Республика Татарстан, Казань, проспект Фатыха Амирхана",49.133893,55.825881,350,,510,"Бумага писчая А4",,,,,,350,"2015-10-24 14:20:12.656851",,,,,1,,,,,,,) NEW=(77,"2015-10-24 14:20:00.858492",16,back,20,82,closed,"2015-10-25 01:00:00","2015-10-29 02:00:00","ООО Комус-Поволжье","Россия, Республика Татарстан, Казань, проспект Фатыха Амирхана",49.133893,55.825881,350,,510,"Бумага писчая А4",,,,,,350,"2015-10-25 07:54:39.033465",,,,,2,,,,,,,)
					-- заказ обновлен
					
					IF NEW."lplace_id" IS NOT NULL THEN
						-- есть место погрузки
						IF COALESCE(OLD."state1" != NEW."state1", TRUE) THEN
							-- изменился статус
							IF COALESCE(NEW."state1" = "order"."order_state_t2i"('opened'), FALSE) THEN
								-- заказ открылся
								UPDATE "lplace"."lplaces" SET "opened_orders_cnt" = "opened_orders_cnt" + 1 WHERE "id" = NEW."lplace_id";
							ELSE
								-- заказ перестал быть открытым
								UPDATE "lplace"."lplaces" SET "opened_orders_cnt" = "opened_orders_cnt" - 1 WHERE "id" = NEW."lplace_id";
							END IF;
						END IF;
					END IF;
					
					RETURN NEW;
					
				WHEN 'DELETE' THEN
					RAISE LOG 'order.trigger_orders_after_state: TG_OP=% TG_WHEN=% OLD=%', TG_OP, TG_WHEN, OLD;
					-- order.trigger_orders_after_state: TG_OP=DELETE TG_WHEN=AFTER OLD=(78,"2015-10-25 07:44:42.865369",17,back,111,222,refrigerator,"2015-10-28 00:00:00","2015-10-30 00:00:00",receiver1,"Соединённые Штаты Америки, Айдахо, Лата, Москоу",-117.000535,46.732349,350,note1,283,cargo1,,,,,,350,,,,,,1,,,,,,,)
					
					IF NEW."lplace_id" IS NOT NULL THEN
						-- было место погрузки
						IF COALESCE(OLD."state1" = "order"."order_state_t2i"('opened'), FALSE) THEN
							-- удаленный заказ был открытым
							UPDATE "lplace"."lplaces" SET "opened_orders_cnt" = "opened_orders_cnt" - 1 WHERE "id" = NEW."lplace_id";
						END IF;
					END IF;
					
					RETURN OLD;
					
				ELSE
					RAISE EXCEPTION 'order.trigger_orders_after_state unhandled TG_OP';
				
			END CASE;
			
		ELSE
			RAISE EXCEPTION 'order.trigger_orders_after_state unhandled TG_WHEN';
		
	END CASE;
	
	RAISE EXCEPTION 'order.trigger_orders_after_state unexpected EOF';
	
EXCEPTION
	WHEN OTHERS THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.trigger_orders_after_state failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE;
END;
$$;


ALTER FUNCTION "order".trigger_orders_after_state() OWNER TO cargochat_u;

SET search_path = price_req, pg_catalog;

--
-- Name: _recalc_bets(bigint); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION _recalc_bets(bigint) RETURNS void
    LANGUAGE sql
    AS $_$UPDATE "price_req"."requests" SET "bets" = (SELECT COUNT(*) FROM "price_req"."bets" WHERE "price_request_id" = $1) WHERE "price_request_id" = $1;$_$;


ALTER FUNCTION price_req._recalc_bets(bigint) OWNER TO cargochat_u;

--
-- Name: bet_create(json, json); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION bet_create(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iPriceRequestId bigint;
	fBet double precision;
	iFlags bigint;
	iCompId bigint;
	iPriceRequestCompId bigint;
	iPriceRequestFlags bigint;
	
	iPriceRequestBetId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'price_req.bet_create % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	
	iPriceRequestId := utils__text2bigint(cm->>'price_request_id');
	fBet := utils__text2float(cm->>'bet');
	iFlags := utils__text2bigint(cm->>'flags');
	IF iPriceRequestId IS NULL THEN RETURN error(-1, 'price_request_id required'); END IF;
	IF fBet IS NULL THEN RETURN error(-1, 'bet required'); END IF;
	IF iFlags IS NULL THEN RETURN error(-1, 'flags required'); END IF;
	
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	-- компания сздавшая заявку и флаги заявки
	SELECT "comp_id", "flags" INTO iPriceRequestCompId, iPriceRequestFlags FROM "price_req"."requests" WHERE "price_request_id" = iPriceRequestId;
	IF NOT FOUND THEN RETURN error(-1, format('price_request(%s) not found', iPriceRequestId)); END IF;
	--RAISE LOG 'iPriceRequestCompId=% iPriceRequestFlags=%', iPriceRequestCompId, iPriceRequestFlags;
	
	--RAISE LOG 'have_price_req_flg_for_related_shippers_only=%', "utils"."flgchk"(iPriceRequestFlags, const.price_req_flg_for_related_shippers_only());
	IF "utils"."flgchk"(iPriceRequestFlags, const.price_req_flg_for_related_shippers_only()) IS TRUE THEN
		-- эта заявка только для перевозчиков компании создателя заяки
		
		PERFORM "relation_id" FROM "comp_relations" WHERE "relation_type" = 'transport' AND "comp_from" = iCompId AND "comp_to" = iPriceRequestCompId;
		IF NOT FOUND THEN RETURN error(-1, format('comp(%s) must have transport relation to comp(%s)', iCompId, iPriceRequestCompId)); END IF;
		
	END IF;
	
	BEGIN
		INSERT INTO "price_req"."bets" ("price_request_id", "comp_id", "bet", "flags", "prc_comp_id", "user_id") VALUES (iPriceRequestId, iCompId, fBet, iFlags, iCompId, iUserId);
	EXCEPTION
		WHEN unique_violation THEN RETURN error(-1, format('price_request(%s) bet for comp(%s) already exist', iPriceRequestId, iCompId));
	END;
	
	iPriceRequestBetId := lastval();
	--RAISE LOG 'iPriceRequestBetId=%', iPriceRequestBetId;
	
	RETURN json_build_object(
		'created_price_request_bet_id', iPriceRequestBetId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'price_req.bet_create failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION price_req.bet_create(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: bets_list(json, json); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION bets_list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "price_request_bet_id",
		"fields": {
			"price_request_bet_id":  {"filter": "bt.price_request_bet_id",  "select": "bt.price_request_bet_id",       "type": "number"},
			"price_request_id":      {"filter": "bt.price_request_id",      "select": "bt.price_request_id",           "type": "number"},
			"ctime":                 {"filter": "utils__ts2int(bt.ctime)",  "select": "utils__ts2int(bt.ctime) ctime", "type": "timestamp"},
			"comp_id":               {"filter": "bt.comp_id",               "select": "bt.comp_id",                    "type": "number"},
			"cnt_customers":         {"filter": "comps.cnt_customers",      "select": "comps.cnt_customers",           "type": "number"},
			"cnt_carriers":          {"filter": "comps.cnt_carriers",       "select": "comps.cnt_carriers",            "type": "number"},
			"cnt_vehicles":          {"filter": "comps.cnt_vehicles",       "select": "comps.cnt_vehicles",            "type": "number"},
			"bet":                   {"filter": "bt.bet",                   "select": "bt.bet",                        "type": "number"},
			"flags":                 {"filter": "bt.flags",                 "select": "bt.flags",                      "type": "number"},
			"tags":                  {"filter": null,                       "select": "(SELECT coalesce(array_agg(tag), ''{}'') FROM comp_tags WHERE (comp_id = bt.comp_id)) tags",                                               "type": "list"},
			"contact":               {"filter": null,                       "select": "(SELECT json_build_object(''id'', id, ''first_name'', first_name, ''last_name'', last_name) FROM users WHERE (id = bt.user_id)) contact",  "type": "j_doc"}
		}
	}';
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
BEGIN
	
	RAISE LOG 'price_req.bets_list % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN tOrderBy = jCfg->>'default_field'; END IF;
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF (iLimit < 1) THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := utils__json2array(cm->'fields');
	IF aFields IS NOT NULL AND (coalesce(array_length(aFields, 1), 0) > 0) THEN
		FOREACH tField IN ARRAY aFields LOOP
			IF (jCfg->'fields'->tField) IS NOT NULL THEN
				aSelection := aSelection || (jCfg->'fields'->tField->>'select');
			END IF;
		END LOOP;
	END IF;
	IF (coalesce(array_length(aSelection, 1), 0) < 1) THEN
		--aSelection := aSelection || (jCfg->>'default_field');
		aSelection := aSelection || (jCfg->'fields'->(jCfg->>'default_field')->>'select');
	END IF;
	--RAISE LOG 'aSelection=%', aSelection;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF aFilters IS NOT NULL THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			--RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			CONTINUE WHEN (json_typeof(jFilter) != 'object');
			
			tCol := jFilter->>'col';
			tVal := jFilter->>'val';
			RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			tColFilter := jCfg->'fields'->tCol->>'filter';
			RAISE LOG 'tColFilter=%', tColFilter;
			CONTINUE WHEN (tCol IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	--aWhere := aWhere || format('count(cr.relation_id) > 0');
	
	tQuery := format('
			CREATE TEMP TABLE t1 ON COMMIT DROP AS
			SELECT %I __key__
			FROM "price_req"."bets" bt
			LEFT JOIN "price_req"."requests" pr ON pr."price_request_id" = bt."price_request_id"
			LEFT JOIN "comps" ON "comps"."id" = bt."comp_id"
		',
		jCfg->>'default_field'
	);
	
	aWhere := aWhere || format('pr."comp_id" = %L', iCompId);
	
	IF (coalesce(array_length(aWhere, 1), 0) > 0) THEN
		tQuery := format('%s WHERE (%s)', tQuery, array_to_string(aWhere, ') AND ('));
	END IF;
	
	tQuery := format(
		'%s GROUP BY bt.%s',
		tQuery,
		jCfg->>'default_field'
	);
	
	RAISE LOG 'tQuery=%', tQuery;
	EXECUTE tQuery;
	
	SELECT count(*) FROM t1 INTO iTotal;
	--RAISE LOG 'iTotal=%', iTotal;
	
	aResult := ARRAY[]::json[];
	IF (iTotal > 0) THEN
		tQuery := format(
			'SELECT * FROM (
				SELECT %s
				FROM t1
				LEFT JOIN "price_req"."bets" bt ON t1.__key__ = bt.%I
				LEFT JOIN "comps" ON "comps"."id" = bt."comp_id"
				ORDER BY %I %s OFFSET %L LIMIT %L
			) q1',
			array_to_string(aSelection, ', '),
			jCfg->>'default_field',
			tOrderBy,
			tDir,
			iOffset,
			iLimit
		);
		RAISE LOG 'tQuery=%', tQuery;
		FOR oRec IN EXECUTE tQuery LOOP
			aResult := aResult || row_to_json(oRec);
			--RAISE LOG 'record=%', row_to_json(oRec);
		END LOOP;
	END IF;
	
	RETURN json_build_object(
		'total', iTotal,
		'data', array_to_json(aResult)
	);
	
END;
$$;


ALTER FUNCTION price_req.bets_list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: bookmark_create(json, json); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION bookmark_create(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	iPriceRequestCompId bigint;
	iPriceRequestFlags bigint;
	iPriceRequestId bigint;
	iPriceRequestBookmarkId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'price_req.bookmark_create % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	iPriceRequestId := utils__text2int(cm->>'price_request_id');
	IF iPriceRequestId IS NULL THEN RETURN error(-1, 'price_request_id required'); END IF;
	
	-- компания создавшая заявку и флаги заявки
	SELECT "comp_id", "flags" INTO iPriceRequestCompId, iPriceRequestFlags FROM "price_req"."requests" WHERE "price_request_id" = iPriceRequestId;
	IF NOT FOUND THEN RETURN error(-1, format('price_request(%s) not found', iPriceRequestId)); END IF;
	--RAISE LOG 'iPriceRequestCompId=% iPriceRequestFlags=%', iPriceRequestCompId, iPriceRequestFlags;
	
	IF iCompId = iPriceRequestCompId THEN RETURN error(-1, format('comp(%s) cant bookmark self created price_request(%s)', iCompId, iPriceRequestId)); END IF;
	
	--RAISE LOG 'have_price_req_flg_for_related_shippers_only=%', "utils"."flgchk"(iPriceRequestFlags, const.price_req_flg_for_related_shippers_only());
	IF ("utils"."flgchk"(iPriceRequestFlags, "const"."price_req_flg_for_related_shippers_only"()) IS TRUE) THEN
		-- эта заявка только для перевозчиков компании создателя заяки
		
		PERFORM "relation_id" FROM "comp_relations" WHERE "relation_type" = 'transport' AND "comp_from" = iCompId AND "comp_to" = iPriceRequestCompId;
		IF NOT FOUND THEN RETURN error(-1, format('comp(%s) must have transport relation to comp(%s)', iCompId, iPriceRequestCompId)); END IF;
		
	END IF;
	
	BEGIN
		INSERT INTO "price_req"."bookmarks" ("price_request_id", "comp_id") VALUES (iPriceRequestId, iCompId);
	EXCEPTION
		WHEN unique_violation THEN RETURN error(-1, format('price_request(%s) bookmark for comp(%s) already exist', iPriceRequestId, iCompId));
		--WHEN foreign_key_violation THEN RETURN error(-1, format('comp(%s) or price_request(%s) not found', iCompId, iPriceRequestId));
	END;
	iPriceRequestBookmarkId := lastval();
	--RAISE LOG 'iPriceRequestBookmarkId=%', iPriceRequestBookmarkId;
	
	RETURN json_build_object(
		'created_price_request_bookmark_id', iPriceRequestBookmarkId,
		'price_request_id', iPriceRequestId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'price_request_bookmark_create failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION price_req.bookmark_create(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: bookmark_delete(json, json); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION bookmark_delete(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	iPriceRequestId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'price_req.bookmark_delete % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	iPriceRequestId := utils__text2int(cm->>'price_request_id');
	IF iPriceRequestId IS NULL THEN RETURN error(-1, 'price_request_id required'); END IF;
	
	DELETE FROM "price_req"."bookmarks" WHERE "price_request_id" = iPriceRequestId AND "comp_id" = iCompId;
	IF NOT FOUND THEN RETURN error(-1, format('comp(%s) and price_request(%s) relation not found', iCompId, iPriceRequestId)); END IF;
	
	RETURN json_build_object(
		'deleted_price_request_bookmark_id', iPriceRequestId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'price_req.bookmark_create failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION price_req.bookmark_delete(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: create(json, json); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION "create"(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	tShipmentTime text;
	tFromAddr text;
	fFromX double precision;
	fFromY double precision;
	tToAddr text;
	fToX double precision;
	fToY double precision;
	tCargoName text;
	fVolume double precision;
	fMass double precision;
	tUnit text;
	tNote text;
	iFlags bigint;
	aShippersComps bigint[];
	iShipperCompId bigint;
	
	iPriceRequestId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'price_req.create % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	tShipmentTime  := cm->>'shipment_time';
	tFromAddr      := cm->>'from_addr';
	fFromX         := utils__text2float(cm->>'from_x');
	fFromY         := utils__text2float(cm->>'from_y');
	tToAddr        := cm->>'to_addr';
	fToX           := utils__text2float(cm->>'to_x');
	fToY           := utils__text2float(cm->>'to_y');
	tCargoName     := cm->>'cargo_name';
	fVolume        := utils__text2float(cm->>'volume');
	fMass          := utils__text2float(cm->>'mass');
	tUnit          := cm->>'unit';
	tNote          := cm->>'note';
	iFlags         := utils__text2bigint(cm->>'flags');
	
	IF tShipmentTime IS NULL THEN RETURN error(-1, 'shipment_time required'); END IF;
	IF tFromAddr IS NULL     THEN RETURN error(-1, 'from_addr required'); END IF;
	IF fFromX IS NULL        THEN RETURN error(-1, 'from_x required'); END IF;
	IF fFromY IS NULL        THEN RETURN error(-1, 'from_y required'); END IF;
	IF tToAddr IS NULL       THEN RETURN error(-1, 'to_addr required'); END IF;
	IF fToX IS NULL          THEN RETURN error(-1, 'to_x required'); END IF;
	IF fToY IS NULL          THEN RETURN error(-1, 'to_y required'); END IF;
	IF tCargoName IS NULL    THEN RETURN error(-1, 'cargo_name required'); END IF;
	IF fVolume IS NULL       THEN RETURN error(-1, 'volume required'); END IF;
	IF fMass IS NULL         THEN RETURN error(-1, 'mass required'); END IF;
	IF tUnit IS NULL         THEN RETURN error(-1, 'unit required'); END IF;
	IF iFlags IS NULL        THEN RETURN error(-1, 'flags required'); END IF;  --const.price_req_flg_for_related_shippers_only()
	
	INSERT INTO "price_req"."requests" (
		"comp_id",
		"shipment_time",
		"from_addr",
		"from_x",
		"from_y",
		"to_addr",
		"to_x",
		"to_y",
		"cargo_name",
		"volume",
		"mass",
		"unit",
		"note",
		"flags",
		"related_carriers_only"
	) VALUES (
		iCompId,
		tShipmentTime,
		tFromAddr,
		fFromX,
		fFromY,
		tToAddr,
		fToX,
		fToY,
		tCargoName,
		fVolume,
		fMass,
		tUnit,
		tNote,
		iFlags,
		"utils"."flgchk"(iFlags, "const"."price_req_flg_for_related_shippers_only"())
	);
	iPriceRequestId := lastval();
	--RAISE LOG 'iPriceRequestId=%', iPriceRequestId;
	
	-- получаем список id компаний которые являются перевозчками для iCompId
	SELECT ARRAY_AGG("comp_from") INTO aShippersComps FROM "comp_relations" WHERE "comp_to" = iCompId AND "relation_type" = 'transport';
	--RAISE LOG 'aShippersComps=%', aShippersComps;
	IF aShippersComps IS NOT NULL AND coalesce(array_length(aShippersComps, 1), 0) > 0 THEN
		-- раздаем запросы перевозчикам
		FOREACH iShipperCompId IN ARRAY aShippersComps LOOP
			INSERT INTO "price_req"."received" ("price_request_id", "comp_id") VALUES (iPriceRequestId, iShipperCompId);
		END LOOP;
	END IF;
	
	RETURN json_build_object(
		'created_price_request_id', iPriceRequestId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'price_req.create failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION price_req."create"(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: delete(json, json); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION delete(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	iPriceRequestId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'price_req.delete % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	iPriceRequestId := utils__text2bigint(cm->>'price_request_id');
	IF iPriceRequestId IS NULL THEN RETURN error(-1, 'price_request_id required'); END IF;
	
	DELETE FROM "price_req"."requests" WHERE "price_request_id" = iPriceRequestId AND "comp_id" = iCompId;
	IF NOT FOUND THEN RETURN error(-1, format('price_request(%s) and comp(%s) relation not found', iPriceRequestId, iCompId)); END IF;
	
	RETURN json_build_object(
		'deleted_price_request_id', iPriceRequestId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'price_req.delete failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION price_req.delete(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: list(json, json); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	tType text;
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "price_request_id",
		"fields": {
			"price_request_id":  {"col":"price_request_id",     "select": "req.price_request_id",           "type": "number"},
			"ctime":             {"col":"ctime",                "select": "utils__ts2int(req.ctime) ctime", "type": "timestamp"},
			"comp_id":           {"col":"comp_id",              "select": "req.comp_id",                    "type": "number"},
			"inn":               {"col":"c.inn",                "select": "c.inn",                          "type": "text"},
			"name":              {"col":"c.name",               "select": "c.name",                         "type": "text"},
			"addr":              {"col":"c.addr",               "select": "c.addr",                         "type": "text"},
			"shipment_time":     {"col":"shipment_time",        "select": "req.shipment_time",              "type": "text"},
			"from_addr":         {"col":"from_addr",            "select": "req.from_addr",                  "type": "text"},
			"from_x":            {"col":"from_x",               "select": "req.from_x",                     "type": "number"},
			"from_y":            {"col":"from_y",               "select": "req.from_y",                     "type": "number"},
			"to_addr":           {"col":"to_addr",              "select": "req.to_addr",                    "type": "text"},
			"to_x":              {"col":"to_x",                 "select": "req.to_x",                       "type": "number"},
			"to_y":              {"col":"to_y",                 "select": "req.to_y",                       "type": "number"},
			"cargo_name":        {"col":"cargo_name",           "select": "req.cargo_name",                 "type": "text"},
			"volume":            {"col":"volume",               "select": "req.volume",                     "type": "number"},
			"mass":              {"col":"mass",                 "select": "req.mass",                       "type": "number"},
			"unit":              {"col":"unit",                 "select": "req.unit",                       "type": "text"},
			"note":              {"col":"note",                 "select": "req.note",                       "type": "text"},
			"flags":             {"col":"flags",                "select": "req.flags",                      "type": "number"},
			"bets":              {"col":"bets",                 "select": "req.bets",                       "type": "number"},
			"bet":               {"col":"price_request_bet_id", "select": "b.bet",    "alias": "bet",       "type": "number"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	aKeys bigint[];
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'price_req.list % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	tType := cm->>'type';
	IF tType IS NULL OR NOT (tType = ANY(ARRAY['regular', 'received', 'bookmarks'])) THEN RETURN error(-1, 'invalid type'); END IF;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	
	--IF (tOrderBy IS NULL) OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN tOrderBy = jCfg->>'default_field'; END IF;
	IF (tOrderBy IS NULL) OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF (tDir IS NULL) OR (NOT (tDir = ANY(ARRAY['ASC','DESC']))) THEN tDir := 'ASC'; END IF;
	IF (iOffset IS NULL) THEN iOffset = 0; END IF;
	IF (iLimit IS NULL) THEN iLimit = 50; ELSIF (iLimit < 1) THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	--RAISE LOG 'aFields=% len=%', aFields, array_length(aFields, 1);
	IF (coalesce(array_length(aFields, 1), 0) > 0) THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF (jField IS NOT NULL) THEN
				IF ((jField->>'alias') IS NULL) THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF (coalesce(array_length(aSelection, 1), 0) < 1) THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF ((jField->>'alias') IS NULL) THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	--RAISE LOG 'aSelection=%', aSelection;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF (aFilters IS NOT NULL) THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			--CONTINUE WHEN (json_typeof(jFilter) != 'object');
			CONTINUE WHEN (json_typeof(jFilter) != 'array') OR (json_array_length(jFilter) != 3);
			--RAISE LOG 'json_array_length=%', json_array_length(jFilter);
			--RAISE LOG 'json_array: col=% op=% val=%', jFilter->>0, jFilter->>1, jFilter->>2;
			
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			--RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			tColFilter := jCfg->'fields'->tCol->>'select';
			--RAISE LOG 'tColFilter=%', tColFilter;
			CONTINUE WHEN (tCol IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('utils__ts2int(%I) < %L', tCol, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('utils__ts2int(%I) > %L', tCol, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('utils__ts2int(%I) = %L', tCol, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	CASE tType
		
		WHEN 'regular' THEN
			
			-- FILTERING into INDEX ARRAY
			aWhere := aWhere || format('req."comp_id" = %L OR req."related_carriers_only" IS FALSE OR rel."relation_id" IS NOT NULL', iCompId);  -- sharing
			tQuery := format('
				SELECT COALESCE(ARRAY_AGG(__req_row."price_request_id"), ARRAY[]::bigint[]) FROM (
					SELECT req."price_request_id"
					FROM "price_req"."requests" "req"
					LEFT JOIN "comp_relations" "rel" ON "rel"."comp_from" = %L AND "rel"."comp_to" = "req"."comp_id" AND "rel"."relation_type" = ''transport''
					LEFT JOIN "price_req"."bets" "b" ON "b"."price_request_id" = "req"."price_request_id" AND "b"."comp_id" = %L
					LEFT JOIN "public"."comps" "c" ON "c"."id" = "req"."comp_id"
					WHERE (%s)
					GROUP BY req."price_request_id"
				) __req_row',
				iCompId,
				iCompId,
				array_to_string(aWhere, ') AND (')
			);
			
			RAISE LOG 'tQuery: %', tQuery;
			EXECUTE tQuery INTO aKeys;
			iTotal := coalesce(array_length(aKeys, 1), 0);
			RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
			
			-- ORDERING & PAGENATION
			aResult := ARRAY[]::json[];
			IF (iTotal > 0) THEN
				tQuery := format('
					SELECT ARRAY_AGG(ROW_TO_JSON(__reqest_row)) FROM (
						SELECT %s
						FROM UNNEST(ARRAY[%s]) __request_id
						LEFT JOIN "price_req"."requests" "req" ON __request_id = "req"."price_request_id"
						LEFT JOIN "price_req"."bets" "b" ON "b"."price_request_id" = "req"."price_request_id" AND "b"."comp_id" = %L
						LEFT JOIN "public"."comps" "c" ON "c"."id" = "req"."comp_id"
						ORDER BY %s %s OFFSET %L LIMIT %L
					) __reqest_row',
					array_to_string(aSelection, ', '),
					array_to_string(aKeys, ', '),
					iCompId,
					tOrderBy, tDir, iOffset, iLimit
				);
				RAISE LOG 'tQuery: %', tQuery;
				EXECUTE tQuery INTO aResult;
			END IF;
		
		WHEN 'received' THEN
			
			-- FILTERING into INDEX ARRAY
			aWhere := aWhere || format('rcvd."comp_id" = %L', iCompId);  -- sharing
			tQuery := format('
				SELECT COALESCE(ARRAY_AGG(__req_row."price_request_id"), ARRAY[]::bigint[]) FROM (
					SELECT req."price_request_id"
					FROM "price_req"."received" "rcvd"
					LEFT JOIN "price_req"."requests" "req" ON "req"."price_request_id" = "rcvd"."price_request_id"
					LEFT JOIN "price_req"."bets" "b" ON "b"."price_request_id" = "req"."price_request_id" AND "b"."comp_id" = %L
					LEFT JOIN "public"."comps" "c" ON "c"."id" = "req"."comp_id"
					WHERE (%s)
					GROUP BY req."price_request_id"
				) __req_row',
				iCompId,
				array_to_string(aWhere, ') AND (')
			);
			
			RAISE LOG 'tQuery: %', tQuery;
			EXECUTE tQuery INTO aKeys;
			iTotal := coalesce(array_length(aKeys, 1), 0);
			RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
			
			-- ORDERING & PAGENATION
			aResult := ARRAY[]::json[];
			IF (iTotal > 0) THEN
				tQuery := format('
					SELECT ARRAY_AGG(ROW_TO_JSON(__reqest_row)) FROM (
						SELECT %s
						FROM UNNEST(ARRAY[%s]) __request_id
						LEFT JOIN "price_req"."requests" "req" ON __request_id = "req"."price_request_id"
						LEFT JOIN "price_req"."bets" b ON "b"."price_request_id" = "req"."price_request_id" AND "b"."comp_id" = %L
						LEFT JOIN "public"."comps" "c" ON "c"."id" = "req"."comp_id"
						ORDER BY %s %s OFFSET %L LIMIT %L
					) __reqest_row',
					array_to_string(aSelection, ', '),
					array_to_string(aKeys, ', '),
					iCompId,
					tOrderBy, tDir, iOffset, iLimit
				);
				RAISE LOG 'tQuery: %', tQuery;
				EXECUTE tQuery INTO aResult;
			END IF;
			
		WHEN 'bookmarks' THEN
			
			-- FILTERING into INDEX ARRAY
			aWhere := aWhere || format('"bm"."comp_id" = %L', iCompId);  -- sharing
			tQuery := format('
				SELECT COALESCE(ARRAY_AGG(__req_row."price_request_id"), ARRAY[]::bigint[]) FROM (
					SELECT req."price_request_id"
					FROM "price_req"."bookmarks" "bm"
					LEFT JOIN "price_req"."requests" "req" ON "req"."price_request_id" = "bm"."price_request_id"
					LEFT JOIN "price_req"."bets" "b" ON "b"."price_request_id" = "req"."price_request_id" AND "b"."comp_id" = %L
					LEFT JOIN "public"."comps" "c" ON "c"."id" = "req"."comp_id"
					WHERE (%s)
					GROUP BY req."price_request_id"
				) __req_row',
				iCompId,
				array_to_string(aWhere, ') AND (')
			);
			
			RAISE LOG 'tQuery: %', tQuery;
			EXECUTE tQuery INTO aKeys;
			iTotal := coalesce(array_length(aKeys, 1), 0);
			RAISE LOG 'aKeys(%)=%', iTotal, aKeys;
			
			-- ORDERING & PAGENATION
			aResult := ARRAY[]::json[];
			IF (iTotal > 0) THEN
				tQuery := format('
					SELECT ARRAY_AGG(ROW_TO_JSON(__reqest_row)) FROM (
						SELECT %s
						FROM UNNEST(ARRAY[%s]) __request_id
						LEFT JOIN "price_req"."requests" "req" ON __request_id = "req"."price_request_id"
						LEFT JOIN "price_req"."bets" "b" ON "b"."price_request_id" = "req"."price_request_id" AND "b"."comp_id" = %L
						LEFT JOIN "public"."comps" "c" ON "c"."id" = "req"."comp_id"
						ORDER BY %s %s OFFSET %L LIMIT %L
					) __reqest_row',
					array_to_string(aSelection, ', '),
					array_to_string(aKeys, ', '),
					iCompId,
					tOrderBy, tDir, iOffset, iLimit
				);
				RAISE LOG 'tQuery: %', tQuery;
				EXECUTE tQuery INTO aResult;
			END IF;
			
	END CASE;
	
	RETURN json_build_object(
		'total', iTotal,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'price_req.list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION price_req.list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: list__old(json, json); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION list__old(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "price_request_id",
		"fields": {
			"price_request_id":  {"select": "pr.price_request_id",           "type": "number"},
			"ctime":             {"select": "utils__ts2int(pr.ctime) ctime", "type": "timestamp"},
			"comp_id":           {"select": "pr.comp_id",                    "type": "number"},
			"shipment_time":     {"select": "pr.shipment_time",              "type": "text"},
			"from_addr":         {"select": "pr.from_addr",                  "type": "text"},
			"from_x":            {"select": "pr.from_x",                     "type": "number"},
			"from_y":            {"select": "pr.from_y",                     "type": "number"},
			"to_addr":           {"select": "pr.to_addr",                    "type": "text"},
			"to_x":              {"select": "pr.to_x",                       "type": "number"},
			"to_y":              {"select": "pr.to_y",                       "type": "number"},
			"cargo_name":        {"select": "pr.cargo_name",                 "type": "text"},
			"volume":            {"select": "pr.volume",                     "type": "number"},
			"mass":              {"select": "pr.mass",                       "type": "number"},
			"unit":              {"select": "pr.unit",                       "type": "text"},
			"note":              {"select": "pr.note",                       "type": "text"},
			"flags":             {"select": "pr.flags",                      "type": "number"},
			"bets":              {"select": "pr.bets",                       "type": "number"}
		}
	}';
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'price_req.list % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN tOrderBy = jCfg->>'default_field'; END IF;
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := utils__json2array(cm->'fields');
	IF (aFields IS NOT NULL) AND (coalesce(array_length(aFields, 1), 0) > 0) THEN
		FOREACH tField IN ARRAY aFields LOOP
			IF ((jCfg->'fields'->tField) IS NOT NULL) THEN
				aSelection := aSelection || (jCfg->'fields'->tField->>'select');
			END IF;
		END LOOP;
	END IF;
	IF (coalesce(array_length(aSelection, 1), 0) < 1) THEN
		--aSelection := aSelection || (jCfg->>'default_field');
		aSelection := aSelection || (jCfg->'fields'->(jCfg->>'default_field')->>'select');
	END IF;
	--RAISE LOG 'aSelection=%', aSelection;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF (aFilters IS NOT NULL) THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			--RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			CONTINUE WHEN (json_typeof(jFilter) != 'object');
			
			tCol := jFilter->>'col';
			tVal := jFilter->>'val';
			--RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('%I < %L', tCol, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%I > %L', tCol, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%I = %L', tCol, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('utils__ts2int(%I) < %L', tCol, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('utils__ts2int(%I) > %L', tCol, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('utils__ts2int(%I) = %L', tCol, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%I ~* E%L', tCol, tVal);
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	--aWhere := aWhere || format('count(cr.relation_id) > 0');
	
	tQuery := format('
			CREATE TEMP TABLE __tmp_tbl ON COMMIT DROP AS
			SELECT %I __key__
			FROM "price_req"."requests" pr
			LEFT JOIN "comp_relations" cr ON cr."comp_from" = %L AND cr."comp_to" = pr."comp_id" AND cr."relation_type" = ''transport''
		',
		jCfg->>'default_field',
		iCompId
	);
	
	IF coalesce(array_length(aWhere, 1), 0) > 0 THEN
		tQuery := format('%s WHERE (%s)', tQuery, array_to_string(aWhere, ') AND ('));
	END IF;
	
	tQuery := tQuery || ' GROUP BY pr."price_request_id" HAVING "utils"."flgchk"(pr."flags", "const"."price_req_flg_for_related_shippers_only"()) IS FALSE OR COUNT(cr."relation_id") > 0';
	
	RAISE LOG 'tQuery=%', tQuery;
	EXECUTE tQuery;
	
	SELECT count(*) FROM __tmp_tbl INTO iTotal;
	--RAISE LOG 'iTotal=%', iTotal;
	
	aResult := ARRAY[]::json[];
	IF (iTotal > 0) THEN
		tQuery := format(
			'SELECT * FROM (
				SELECT %s
				FROM __tmp_tbl
				LEFT JOIN "price_req"."requests" pr ON __tmp_tbl.__key__ = pr.%I
				GROUP BY pr."price_request_id"
				ORDER BY pr.%I %s OFFSET %L LIMIT %L
			) q1',
			array_to_string(aSelection, ', '), jCfg->>'default_field', tOrderBy, tDir, iOffset, iLimit
		);
		RAISE LOG 'tQuery=%', tQuery;
		FOR oRec IN EXECUTE tQuery LOOP
			aResult := aResult || row_to_json(oRec);
			--RAISE LOG 'record=%', row_to_json(oRec);
		END LOOP;
	END IF;
	
	RETURN json_build_object(
		'total', iTotal,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'price_req.list failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION price_req.list__old(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: received_delete(json, json); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION received_delete(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	iPriceRequestId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	RAISE LOG 'price_req.received_delete % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	iPriceRequestId := utils__text2bigint(cm->>'price_request_id');
	IF iPriceRequestId IS NULL THEN RETURN error(-1, 'price_request_id required'); END IF;
	
	DELETE FROM "price_req"."received" WHERE "price_request_id" = iPriceRequestId AND "comp_id" = iCompId;
	IF NOT FOUND THEN RETURN error(-1, format('price_request_received(%s) and comp(%s) relation not found', iPriceRequestId, iCompId)); END IF;
	
	RETURN json_build_object(
		'deleted_price_request_received_id', iPriceRequestId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'price_request_received_delete failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION price_req.received_delete(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: trigger_bets_change(); Type: FUNCTION; Schema: price_req; Owner: cargochat_u
--

CREATE FUNCTION trigger_bets_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'trigger_bets_change: % % %', TG_WHEN, TG_OP, TG_RELNAME;
	-- trigger_price_request_bets_updater: AFTER INSERT price_request_bets (17,"2015-08-26 03:12:05.644307",12,100,1,281)
	
	CASE (TG_OP)
		WHEN 'INSERT' THEN
			
			--RAISE LOG 'NEW.price_request_id=%', NEW.price_request_id;
			PERFORM "price_req"."_recalc_bets"(NEW.price_request_id);
			RETURN NEW;
			
		WHEN 'UPDATE' THEN
			
			--RAISE LOG 'price_request_id: % to %', OLD.price_request_id, NEW.price_request_id;
			IF (OLD.price_request_id != NEW.price_request_id) THEN
				PERFORM "price_req"."_recalc_bets"(OLD.price_request_id);
				PERFORM "price_req"."_recalc_bets"(NEW.price_request_id);
			END IF;
			RETURN NEW;
			
		ELSE
			
			--RAISE LOG 'OLD.price_request_id=%', OLD.price_request_id;
			PERFORM "price_req"."_recalc_bets"(OLD.price_request_id);
			
			RETURN OLD;
			
	END CASE;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'trigger_bets_change failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		--CASE (TG_OP)
		--	WHEN 'INSERT' THEN RETURN NEW;
		--	WHEN 'UPDATE' THEN RETURN OLD;
		--	ELSE RETURN OLD;
		--END CASE;
END;
$$;


ALTER FUNCTION price_req.trigger_bets_change() OWNER TO cargochat_u;

SET search_path = privates, pg_catalog;

--
-- Name: hist_list(json, json); Type: FUNCTION; Schema: privates; Owner: cargochat_u
--

CREATE FUNCTION hist_list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	iOppId bigint;
	iPrivateId bigint;
	iLastReadedMessageId bigint;
	iOppLastReadedMessageId bigint;
	iOppLastReadedMessageTs bigint;
	
	-- schema
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":        {"col": "message_id",   "select": "message_id",             "alias": "id",       "type": "number"},
			"ts":        {"col": "ctime",        "select": "utils__ts2int(ctime)",   "alias": "ts",       "type": "timestamp"},
			"uid":       {"col": "user_id",      "select": "user_id",                "alias": "uid",      "type": "number"},
			"body":      {"col": "message_body", "select": "message_body",           "alias": "body",     "type": "text"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	-- ordering, pagenation
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimitT bigint;
	iLimit bigint;
	
	-- filtering
	aFilters json[];
	jFilter json;
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	-- fetching
	c1 refcursor;
	r1 record;
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	-- error handling
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'privates.hist_list % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	iOppId := utils__text2bigint(cm->>'opp_user_id');
	IF iOppId IS NULL THEN RETURN error(-1, 'opp_user_id required'); END IF;
	
	IF (iUserId < iOppId) THEN
		SELECT private_id, user1_lrm_id,         user2_lrm_id,            utils__ts2int(user2_lrm_ts)
		INTO   iPrivateId, iLastReadedMessageId, iOppLastReadedMessageId, iOppLastReadedMessageTs
		FROM   msg_privates
		WHERE  user1_id = iUserId AND user2_id = iOppId;
	ELSE
		SELECT private_id, user2_lrm_id,         user1_lrm_id,            utils__ts2int(user1_lrm_ts)
		INTO   iPrivateId, iLastReadedMessageId, iOppLastReadedMessageId, iOppLastReadedMessageTs
		FROM   msg_privates
		WHERE  user1_id = iOppId AND user2_id = iUserId;
	END IF;
	
	tOrderBy  := cm->>'orderBy';
	tDir      := cm->>'dir';
	iOffset   := utils__text2bigint(cm->>'offset');
	iLimit    := utils__text2bigint(cm->>'limit');
	
	IF iPrivateId IS NULL THEN
		
		--RETURN error(-1, format('private between user(%s) and user(%s) not found', iUserId, iOppId));
		
		RETURN json_build_object(
			'total',      0,
			'offset',     iOffset,
			'limit',      iLimit,
			'data',       ARRAY[]::json[],
			'private_id', NULL,
			'lrm_id',     NULL,
			'opp_lrm_id', NULL,
			'opp_lrm_ts', NULL
		);
		
	END IF;
	
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF iLimit > 500 THEN iLimit = 500; END IF;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	IF coalesce(array_length(aFields, 1), 0) > 0 THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF jField IS NOT NULL THEN
				IF (jField->>'alias') IS NULL THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF coalesce(array_length(aSelection, 1), 0) < 1 THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF (jField->>'alias') IS NULL THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	
	BEGIN SELECT ARRAY_AGG(el) INTO aFilters FROM json_array_elements(cm->'filters') el; EXCEPTION WHEN OTHERS THEN NULL; END;
	
	IF aFilters IS NOT NULL THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			CONTINUE WHEN json_typeof(jFilter) != 'array' OR json_array_length(jFilter) != 3;
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			CONTINUE WHEN tCol IS NULL OR (jCfg->'fields'->tCol) IS NULL OR tVal IS NULL;
			tColFilter := jCfg->'fields'->tCol->>'select';
			CONTINUE WHEN tCol IS NULL;
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);  -- todo: use `like`, check dots
			ELSE
			END CASE;
		END LOOP;
	END IF;
	
	aWhere := aWhere || format('"public"."msg_private_hist"."private_id" = %L', iPrivateId);
	/*
	IF coalesce(array_length(aWhere, 1), 0) < 1 THEN
		aWhere := aWhere || 'TRUE'::text;
	END IF;
	*/
	
	tQuery := format('
		SELECT %s
		FROM "public"."msg_private_hist"
		WHERE (%s)
		ORDER BY %s %s',
		array_to_string(aSelection, ', '),
		array_to_string(aWhere, ') AND ('),
		tOrderBy, tDir
	);
	RAISE LOG 'tQuery: %', tQuery;
	
	OPEN c1 FOR EXECUTE tQuery;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS iTotal = ROW_COUNT;
	RAISE LOG 'iTotal=%', iTotal;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD iOffset IN c1;
	iLimitT := iLimit;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		aResult := aResult || row_to_json(r1);
		IF iLimit <= 1 THEN EXIT; END IF;
		iLimit := iLimit - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total',      iTotal,
		'offset',     iOffset,
		'limit',      iLimitT,
		'data',       array_to_json(aResult),
		'private_id', iPrivateId,
		'lrm_id',     iLastReadedMessageId,
		'opp_lrm_id', iOppLastReadedMessageId,
		'opp_lrm_ts', iOppLastReadedMessageTs
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'privates.hist_list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION privates.hist_list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: list(json, json); Type: FUNCTION; Schema: privates; Owner: cargochat_u
--

CREATE FUNCTION list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	-- schema
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":        {"select": "tp.private_id",             "alias": "id",       "type": "number"},
			"ts":        {"select": "utils__ts2int(tp.ctime)",   "alias": "ts",       "type": "timestamp"},
			"opp_id":    {"select": "tp.__opp__",                "alias": "opp_id",   "type": "number"},
			"fn":        {"select": "tp.__fn__",                 "alias": "fn",       "type": "text"},
			"ln":        {"select": "tp.__ln__",                 "alias": "ln",       "type": "text"},
			"unreaded":  {"select": "tp.__unreaded__",           "alias": "unreaded", "type": "number"},
			"cid":       {"select": "tp.__cid__",                "alias": "cid",      "type": "number"},
			"cname":     {"select": "tp.__cname__",              "alias": "cname",    "type": "text"},
			"lrm":       {"select": "tp.__lrm__",                "alias": "lrm",      "type": "number"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	-- ordering, pagenation
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	iLimitT bigint;
	
	-- filtering
	aFilters json[];
	jFilter json;
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	-- fetching
	c1 refcursor;
	r1 record;
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	-- error handling
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'privates.list % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	tOrderBy  := cm->>'orderBy';
	tDir      := cm->>'dir';
	iOffset   := utils__text2bigint(cm->>'offset');
	iLimit    := utils__text2bigint(cm->>'limit');
	
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF iLimit > 500 THEN iLimit = 500; END IF;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	IF coalesce(array_length(aFields, 1), 0) > 0 THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF jField IS NOT NULL THEN
				IF (jField->>'alias') IS NULL THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF coalesce(array_length(aSelection, 1), 0) < 1 THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF (jField->>'alias') IS NULL THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	
	BEGIN SELECT ARRAY_AGG(el) INTO aFilters FROM json_array_elements(cm->'filters') el; EXCEPTION WHEN OTHERS THEN NULL; END;
	
	IF aFilters IS NOT NULL THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			CONTINUE WHEN json_typeof(jFilter) != 'array' OR json_array_length(jFilter) != 3;
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			CONTINUE WHEN tCol IS NULL OR (jCfg->'fields'->tCol) IS NULL OR tVal IS NULL;
			tColFilter := jCfg->'fields'->tCol->>'select';
			CONTINUE WHEN tCol IS NULL;
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);  -- todo: use `like`, check dots
			ELSE
			END CASE;
		END LOOP;
	END IF;
	
	IF coalesce(array_length(aWhere, 1), 0) < 1 THEN
		aWhere := aWhere || 'TRUE'::text;
	END IF;
	
	tQuery := format('
		SELECT %s FROM (
			SELECT * FROM (
				SELECT
					"tp"."private_id", "tp"."ctime", "tp"."user2_lrm_id" "__lrm__",
					"user1_id" "__opp__", "user2_unreaded" "__unreaded__",
					"tu"."first_name" "__fn__", "tu"."last_name" "__ln__",
					"co"."id" "__cid__", "co"."name" "__cname__"
				FROM "public"."msg_privates" "tp"
				LEFT JOIN "public"."users" "tu" ON "tp"."user1_id" = "tu"."id"
				LEFT JOIN "public"."comps" "co" ON "tu"."comp_id" = "co"."id"
				WHERE "tp"."user2_id" = %L
			) "tp"
			WHERE (%s)
		UNION
			SELECT * FROM (
				SELECT
					"tp"."private_id", "tp"."ctime", "tp"."user1_lrm_id" "__lrm__",
					"user2_id" "__opp__", "user1_unreaded" "__unreaded__",
					"tu"."first_name" "__fn__", "tu"."last_name" "__ln__",
					"co"."id" "__cid__", "co"."name" "__cname__"
				FROM "public"."msg_privates" "tp"
				LEFT JOIN "public"."users" "tu" ON "tp"."user2_id" = "tu"."id"
				LEFT JOIN "public"."comps" "co" ON "tu"."comp_id" = "co"."id"
				WHERE "tp"."user1_id" = %L
			) "tp"
			WHERE (%s)
		) "tp"
		ORDER BY %s %s',
		array_to_string(aSelection, ', '),
		iUserId, array_to_string(aWhere, ') AND ('),
		iUserId, array_to_string(aWhere, ') AND ('),
		tOrderBy, tDir
	);
	RAISE LOG 'tQuery: %', tQuery;
	
	OPEN c1 FOR EXECUTE tQuery;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS iTotal = ROW_COUNT;
	RAISE LOG 'iTotal=%', iTotal;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD iOffset IN c1;
	iLimitT := iLimit;
	LOOP
		FETCH c1 INTO r1;
		EXIT WHEN NOT FOUND;
		aResult := aResult || row_to_json(r1);
		EXIT WHEN iLimit <= 1;
		iLimit := iLimit - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total', iTotal,
		'offset', iOffset,
		'limit', iLimitT,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'privates.list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION privates.list(cl json, cm json) OWNER TO cargochat_u;

SET search_path = public, pg_catalog;

--
-- Name: bigint2uniqstr(bigint); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION bigint2uniqstr(v bigint) RETURNS text
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
DECLARE
	
	src text;
	res text = '';
	res2 text = '';
	
	-- shuffled array [0..95]
	seq int[] = ARRAY[51, 3, 67, 53, 83, 44, 45, 84, 35, 87, 63, 25, 82, 11, 38, 41, 64, 77, 73, 22, 21, 61, 91, 26, 46, 71, 8, 76, 66, 15, 10, 52, 13, 56, 20, 6, 36, 19, 50, 92, 86, 0, 12, 48, 30, 89, 68, 32, 79, 72, 24, 23, 47, 78, 57, 58, 31, 70, 34, 39, 75, 16, 88, 62, 43, 74, 27, 85, 1, 28, 14, 55, 80, 5, 81, 95, 65, 9, 42, 2, 7, 54, 33, 90, 4, 40, 59, 29, 93, 49, 37, 94, 18, 60, 69, 17];
	i int;
	
BEGIN
	
	--RAISE LOG 'bigint2uniqstr % %', v, v::bit(64);
	
	--src := v::bit(64) || trunc((x'FFFFFFFE'::bigint)*random())::bigint::bit(32);
	src := v::bit(64) || x'12345678'::bigint::bit(32);
	--RAISE LOG 'src=%', src;
	
	FOREACH i IN ARRAY seq LOOP
		--RAISE LOG 'byte #% is %', i, substr(src, 96-i, 1);
		res := substr(src, 96-i, 1) || res;
	END LOOP;
	
	--RAISE LOG 'res=%', res;
	
	FOR i IN 1..96 BY 8 LOOP
		--RAISE LOG '% % %', i, substr(v2, i, 8), lpad(to_hex(substr(v2, i, 8)::bit(8)::integer), 2, '0');
		res2 := res2 || lpad(to_hex(substr(res, i, 8)::bit(8)::integer), 2, '0');
	END LOOP;
	
	--RAISE LOG 'res2=%', res2;
	
	RETURN res2;
	
END;
$$;


ALTER FUNCTION public.bigint2uniqstr(v bigint) OWNER TO cargochat_u;

--
-- Name: bigint2ut(bigint); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION bigint2ut(v bigint) RETURNS text
    LANGUAGE plpythonu IMMUTABLE COST 1
    AS $$import random

ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
def base62_encode(num, alphabet=ALPHABET):
	if (num == 0):
		return alphabet[0]
	arr = []
	base = len(alphabet)
	while num:
		rem = num % base
		num = num // base
		arr.append(alphabet[rem])
	arr.reverse()
	return ''.join(arr)

# берем входящий int64
# ксорим его по константной маске
# смещаем влево на 32 бита
# мержим радномные 32 бита в конец
# полученные 96 бит перемешиваем по константному сценарию `l`
# перемешанные 96 бит кодируем в base62
# делаем zrofill до 17 байт
# возвращаем реверс

l = [51,3,67,53,83,44,45,84,35,87,63,25,82,11,38,41,64,77,73,22,21,61,91,26,46,71,8,76,66,15,10,52,13,56,20,6,36,19,50,92,86,0,12,48,30,89,68,32,79,72,24,23,47,78,57,58,31,70,34,39,75,16,88,62,43,74,27,85,1,28,14,55,80,5,81,95,65,9,42,2,7,54,33,90,4,40,59,29,93,49,37,94,18,60,69,17];

# 12297829382473034410L == int('1010101010101010101010101010101010101010101010101010101010101010', 2)
src = ((v ^ 12297829382473034410L) << 32) | int(random.random() * 0xFFFFFFFF)

res = 0
for i in xrange(0, 96):
	b = (1 << l[i])
	if ((src & b) == b):
		res |= (1 << i)

#return format(res, '024x')
return base62_encode(res).zfill(17)[::-1]
#return base62_encode(0xFFFFFFFFFFFFFFFFFFFFFFFF).zfill(17)  # 1F2si9ujpxVB7VDj1$$;


ALTER FUNCTION public.bigint2ut(v bigint) OWNER TO cargochat_u;

--
-- Name: check_unique(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION check_unique(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	tField text;
	tValue text;
	iHolderId bigint;
BEGIN
	
	tField := cm->>'field';
	tValue := cm->>'value';
	IF (tField IS NULL) OR (tValue IS NULL) THEN RETURN error(-2000, 'invalid params'); END IF;
	
	CASE tField
		WHEN 'user_email'   THEN SELECT id FROM users INTO iHolderId WHERE LOWER(email)   = LOWER(tValue);
		WHEN 'user_mobile'  THEN SELECT id FROM users INTO iHolderId WHERE LOWER(mobile)  = LOWER(tValue);
		WHEN 'user_icq'     THEN SELECT id FROM users INTO iHolderId WHERE LOWER(icq)     = LOWER(tValue);
		WHEN 'user_skype'   THEN SELECT id FROM users INTO iHolderId WHERE LOWER(skype)   = LOWER(tValue);
		WHEN 'comp_inn'     THEN SELECT id FROM comps INTO iHolderId WHERE LOWER(inn)     = LOWER(tValue);
		WHEN 'comp_ogrn'    THEN SELECT id FROM comps INTO iHolderId WHERE LOWER(ogrn)    = LOWER(tValue);
	ELSE
		RETURN error(-1, 'invalid field');
	END CASE;
	
	RETURN json_build_object('unique', (NOT FOUND), 'holder_id', iHolderId);
	
END;
$$;


ALTER FUNCTION public.check_unique(cm json) OWNER TO cargochat_u;

--
-- Name: comp_check(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_check(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	jDadata json;
	--tKPP text;
	--oRec record;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	--IF (user_perm_test(i_user_id, 'unlimited') IS NOT TRUE) THEN RETURN error(-11, 'no perms'); END IF;
	
	jDadata := cm->'dadata';
	IF jDadata IS NULL THEN RETURN error(-1010, 'dadata required'); END IF;
	
	--tKPP := coalesce(jDadata#>>'{data,kpp}', 'none');
	
	BEGIN
		INSERT INTO dadata_opf (code, "full", short) VALUES (jDadata#>>'{data,opf,code}', jDadata#>>'{data,opf,full}', jDadata#>>'{data,opf,short}');
	EXCEPTION
		WHEN others THEN NULL;
	END;
	
	iCompId := -1;
	
	BEGIN
		INSERT INTO comps ("name", "inn", "kpp", "addr", "ogrn", "opf", "x", "y", "ymap", "dadata", "j_doc")
		VALUES (
			jDadata#>>'{value}',
			jDadata#>>'{data,inn}',
			jDadata#>>'{data,kpp}',
			jDadata#>>'{data,address,value}',
			jDadata#>>'{data,ogrn}',
			jDadata#>>'{data,opf,code}',
			utils__text2float(cm->>'x'),
			utils__text2float(cm->>'y'),
			(cm->'ymap')::jsonb,
			(jDadata)::jsonb,
			(cm->'j_doc')::jsonb
		);
		iCompId := lastval();
		--RAISE LOG 'iCompId=%', iCompId;
	EXCEPTION
		WHEN others THEN
			RAISE LOG 'insert into comps failed: %', SQLSTATE;
			IF eConstraint = 'comps_inn_kpp_addr_key' THEN
				RETURN error(-4, 'unique_violation: inn + kpp + addr');
			END IF;
	END;
	
	IF iCompId = -1 THEN
		SELECT id INTO iCompId FROM comps WHERE inn = jDadata#>>'{data,inn}' AND kpp = jDadata#>>'{data,kpp}' AND addr = jDadata#>>'{data,address,value}';
		IF NOT FOUND THEN RETURN error(-2000, 'comp not found'); END IF;
	END IF;
	
	--SELECT * FROM comps INTO oRec WHERE (id = iCompId);
	--RETURN json_build_object('comp_id', iCompId);
	--RETURN row_to_json(oRec);
	--RETURN graph(('{"query":{"comps":{"filters":[["id","eq",' || iCompId || ']],"sub":{"comp_tags":{}}}}}')::json);
	RETURN "comp"."get"(
		json_build_object(
			'inn',  jDadata#>>'{data,inn}',
			'kpp',  jDadata#>>'{data,kpp}',
			'addr', jDadata#>>'{data,address,value}'
		)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'comp_create failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		--IF eConstraint = 'comps_inn_kpp_addr_key' THEN RETURN error(-4, 'unique_violation: inn + kpp + addr'); END IF;  -- unique_violation
		IF eTable = 'comps' THEN
			IF SQLSTATE = '23502' AND eCol = 'inn' THEN RETURN error(-1, 'inn required'); END IF;  -- not_null_violation
			IF SQLSTATE = '23502' AND eCol = 'ogrn' THEN RETURN error(-5, 'ogrn required'); END IF;  -- not_null_violation
		END IF;
		IF eConstraint = 'comps_opf_fkey' THEN RETURN error(-7, 'invalid opf'); END IF;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.comp_check(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_create2(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_create2(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	tPhoneSrc text;
	tPhoneNum text;
	jDadata json;
	--jTag json;
	--iTag integer;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	IF (user_perm_test(i_user_id, 'unlimited') IS NOT TRUE) THEN RETURN error(-11, 'no perms'); END IF;
	
	tPhoneSrc := cm->>'phone';
	IF (tPhoneSrc IS NOT NULL) THEN
		SELECT array_to_string(ARRAY(SELECT SUBSTRING(regexp_matches(tPhoneSrc, '(\d)', 'g')::text FROM 2 FOR 1)), '') INTO tPhoneNum;
		RAISE LOG 'Phones: % %', tPhoneSrc, tPhoneNum;
		IF (tPhoneNum IS NULL) OR (length(tPhoneNum) != 11) THEN
			RETURN error(-10, 'invalid phone');
		END IF;
	END IF;
	
	jDadata := cm->'dadata';
	IF (jDadata IS NULL) THEN RETURN error(-1010, 'dadata required'); END IF;
	
	BEGIN
		INSERT INTO dadata_opf (code, "full", short) VALUES (jDadata#>>'{data,opf,code}', jDadata#>>'{data,opf,full}', jDadata#>>'{data,opf,short}');
	EXCEPTION
		WHEN OTHERS THEN NULL;
	END;
	
	INSERT INTO comps ("name", inn, kpp, addr, ogrn, opf, x, y, ymap, dadata, phone, email, web_site, j_doc, state)
	VALUES (
		jDadata#>>'{value}',
		jDadata#>>'{data,inn}',
		jDadata#>>'{data,kpp}',
		jDadata#>>'{data,address,value}',
		jDadata#>>'{data,ogrn}',
		jDadata#>>'{data,opf,code}',
		utils__text2float(cm->>'x'),
		utils__text2float(cm->>'y'),
		(cm->'ymap')::jsonb,
		(jDadata)::jsonb,
		tPhoneNum,
		cm->>'email',
		cm->>'web_site',
		(cm->'j_doc')::jsonb,
		'new'
	);
	iCompId := lastval();
	RAISE LOG 'iCompId=%', iCompId;
	
	-- disabled temporary
	--FOR jTag IN (
	--	SELECT * FROM json_array_elements((cm->>'tags')::json)
	--) LOOP
	--	iTag := utils__text2int(jTag::text);
		--RAISE LOG 'jTag=% iTag=%', jTag::text, iTag;
	--	IF (iTag IS NOT NULL) THEN
	--		INSERT INTO rt_comp_tag (comp_id, tag) VALUES (iCompId, iTag);
	--	END IF;
	--END LOOP;
	
	RETURN json_build_object('comp_id', iCompId);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'comp_create2 failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		--  comp_create2 failed: SQLSTATE=23505 SQLERRM="duplicate key value violates unique constraint "comps_inn_kpp_addr_idx"" table=comps col= detail="Key (inn, kpp, addr)=(2723003134, 272301001, Хабаровский край, г Хабаровск, ул Суворова, д 84) already exists." eConstraint=comps_inn_kpp_addr_idx
		IF (eConstraint = 'comps_inn_kpp_addr_idx') THEN RETURN error(-4, 'unique_violation: inn + kpp + addr'); END IF;  -- unique_violation
		IF (eTable = 'comps') THEN
			--IF (SQLSTATE = '23505') AND (eConstraint = 'comps_inn_idx') THEN RETURN error(-1, 'inn not unique'); END IF;  -- unique_violation
			--IF (SQLSTATE = '23505') AND (eConstraint = 'comps_ogrn_idx') THEN RETURN error(-3, 'ogrn not unique'); END IF;  -- unique_violation
			IF (SQLSTATE = '23502') AND (eCol = 'inn') THEN RETURN error(-1, 'inn required'); END IF;  -- not_null_violation
			--IF (SQLSTATE = '23502') AND (eCol = 'kpp') THEN RETURN error(-2, 'kpp required'); END IF;  -- not_null_violation
			IF (SQLSTATE = '23502') AND (eCol = 'ogrn') THEN RETURN error(-5, 'ogrn required'); END IF;  -- not_null_violation
		END IF;
		IF (eTable = 'rt_comp_tag') AND (SQLSTATE = '23503') THEN  -- foreign_key_violation
			CASE eConstraint
				WHEN 'comps_tags_tag_fkey' THEN RETURN error(-9, 'invalid tags');
			ELSE END CASE;
		END IF;
		IF (eConstraint = 'comps_opf_fkey') THEN RETURN error(-7, 'invalid opf'); END IF;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.comp_create2(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_delete(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_delete(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId := utils__text2bigint(cm->>'comp_id');
	IF (iCompId IS NULL) THEN RETURN error(-1, 'invalid comp_id'); END IF;
	
	--IF (perm_test(i_user_id, iCompId, 'comp_delete') IS NOT TRUE) THEN RETURN error(-2, 'no perms'); END IF;
	IF (user_perm_test(i_user_id, 'unlimited') IS NOT TRUE) THEN RETURN error(-2, 'no perms'); END IF;
	
	DELETE FROM comps WHERE (id = iCompId);
	IF (NOT FOUND) THEN RETURN error(-1, 'comp not found'); END IF;
	
	RETURN json_build_object();
	
END;
$$;


ALTER FUNCTION public.comp_delete(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_logo_delete(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_logo_delete(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	tLogoPrev text;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	SELECT comp_id INTO iCompId FROM users WHERE (id = i_user_id);
	IF (NOT FOUND) THEN RETURN error(-1, format('user(%s) have no comp', i_user_id)); END IF;
	
	--IF (perm_test(i_user_id, iCompId, 'unlimited') IS NOT TRUE) THEN RETURN error(-1, 'no perms'); END IF;
	IF (comp_user_perm_test(i_user_id, iCompId, const.user_comp_perm__unlim()) IS NOT TRUE) THEN RETURN error(-1, 'no perms'); END IF;
	
	SELECT logo INTO tLogoPrev FROM comps WHERE (id = iCompId);
	UPDATE comps SET logo = NULL WHERE (id = iCompId);
			
	RETURN json_build_object('logo_prev', tLogoPrev, 'logo_new', NULL);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'comp_logo_delete failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.comp_logo_delete(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_logo_upsert(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_logo_upsert(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tFrm text;
	iCompId bigint;
	tLogoPrev text;
	tLogoNew text;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	tFrm := cm->>'frm';
	IF (tFrm IS NULL) THEN RETURN error(-1, 'frm required'); END IF;
	
	SELECT comp_id INTO iCompId FROM users WHERE (id = i_user_id);
	IF (NOT FOUND) THEN RETURN error(-1, format('user(%s) have no comp', i_user_id)); END IF;
	
	--IF (perm_test(i_user_id, iCompId, 'unlimited') IS NOT TRUE) THEN RETURN error(-1, 'no perms'); END IF;
	IF (comp_user_perm_test(i_user_id, iCompId, const.user_comp_perm__unlim()) IS NOT TRUE) THEN RETURN error(-1, 'no perms'); END IF;
	
	SELECT logo INTO tLogoPrev FROM comps WHERE (id = iCompId);
	tLogoNew := format('%s.%s', bigint2ut(nextval('public_file_id_seq')), tFrm);
	RAISE LOG 'tLogoNew=%', tLogoNew;
	
	UPDATE comps SET logo = tLogoNew WHERE (id = iCompId);
	
	RETURN json_build_object('logo_prev', tLogoPrev, 'logo_new', tLogoNew, 'logo', wrap_comp_logo(tLogoNew));
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'comp_logo_upsert failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.comp_logo_upsert(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_relation_create(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_relation_create(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tType text;
	iFrom bigint;
	iTo bigint;
	
	tpRelationType "comp"."tp_comp_relation_type";
	
	iCompId bigint;
	iSecondCompId bigint;
	tSecondCompState text;
	tpRelationOption "comp"."tp_comp_relation_option1";
	
	jCompInviteCreateResult json;
	iInviteId bigint;
	jResult json;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	--RAISE LOG 'comp_relation_create';
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	tType  = cm->>'relation_type';
	iFrom  = utils__text2bigint(cm->>'comp_from');
	iTo    = utils__text2bigint(cm->>'comp_to');
	
	IF iFrom IS NULL THEN RETURN error(-1, 'comp_from required'); END IF;
	IF iTo IS NULL THEN RETURN error(-1, 'comp_to required'); END IF;
	IF tType IS NULL THEN RETURN error(-1, 'relation_type required'); END IF;
	
	--IF (tType = 'trade') THEN RETURN error(-1, 'type "trade" temporary blocked'); END IF;
	
	BEGIN
		tpRelationType := tType::"comp"."tp_comp_relation_type";
	EXCEPTION
		WHEN others THEN
			--GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
			--RAISE LOG 'relation_type casting failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
			RETURN error(-2, 'invalid relation_type');
	END;
	
	SELECT "comp_id" INTO iCompId FROM "public"."users" WHERE "id" = i_user_id;
	IF iCompId IS NULL THEN RETURN error(-3, format('user(%s) must have comp', i_user_id)); END IF;
	
	IF iFrom = iTo THEN RETURN error(-1, 'comp_from and comp_to must be different'); END IF;
	
	IF iCompId = iFrom
		THEN iSecondCompId := iTo;
	ELSIF iCompId = iTo
		THEN iSecondCompId := iFrom;
	ELSE
		RETURN error(-3, format('no perms: your comp(%s) cant create relation between %s and %s', iCompId, iFrom, iTo));
	END IF;
	
	--IF (perm_test(i_user_id, iCompId, 'comp_relations_manage') IS NOT TRUE) THEN RETURN error(-3, format('perm(%s) required, user(%s) comp(%s)', 'comp_relations_manage', i_user_id, iCompId)); END IF;
	IF "public"."comp_user_perm_test"(i_user_id, iCompId, "const"."user_comp_perm__relations_manager"()) IS NOT TRUE THEN RETURN error(-3, format('perm(%s) required, user(%s) comp(%s)', 'comp_relations_manage', i_user_id, iCompId)); END IF;
	
	-- extract tpRelationOption
	CASE (tpRelationType)
		--WHEN 'trade' THEN
		--	IF (iSecondCompId = iFrom) THEN
		--		SELECT rel_trade_from INTO tpRelationOption FROM comps WHERE (id = iSecondCompId);
		--	ELSIF (iSecondCompId = iTo) THEN
		--		SELECT rel_trade_to INTO tpRelationOption FROM comps WHERE (id = iSecondCompId);
		--	END IF;
		WHEN 'transport' THEN
			IF iSecondCompId = iFrom THEN
				SELECT "rel_transport_from" INTO tpRelationOption FROM "public"."comps" WHERE "id" = iSecondCompId;
			ELSIF iSecondCompId = iTo THEN
				SELECT "rel_transport_to" INTO tpRelationOption FROM "public"."comps" WHERE "id" = iSecondCompId;
			END IF;
			IF NOT FOUND THEN RETURN error(-1, format('comp(%s) not found', iSecondCompId)); END IF;
		WHEN 'expedition' THEN
			IF iCompId != iTo THEN RETURN error(-1, format('you must set comp_to(%s) not %s for expedition relation', iCompId, iTo)); END IF;
			-- comp_to must have shipper tag 
			PERFORM FROM "comp_tags" WHERE "comp_id" = iTo AND "tag" = 'shipper'::"comp"."tp_comp_tag";
			IF NOT FOUND THEN RETURN error(-1, format('no perms: comp(%s) must have tag shipper for create expedition relation', iTo)); END IF;
			-- allowed
			tpRelationOption := 'any';
		ELSE
	END CASE;
	
	--RAISE LOG '******* tpRelationType = ANY(ARRAY[''trade'', ''transport'']): %', (tType = ANY(ARRAY['trade', 'transport']));
	IF tType = ANY(ARRAY['trade', 'transport']) THEN
		--RAISE LOG 'tpRelationType=% iSecondCompId=% tpRelationOption=% is_any=% is_none=% is_request=%', tpRelationType, iSecondCompId, tpRelationOption, tpRelationOption::text = 'any', tpRelationOption::text = 'none', tpRelationOption::text = 'request';
		
		CASE (tpRelationOption)
			WHEN 'any' THEN
				-- allowed
			WHEN 'none' THEN
				RETURN error(-5, format('relation(%s) blocked by comp(%s) whith tpRelationOption(%s)', tpRelationType, iSecondCompId, tpRelationOption));
			WHEN 'request' THEN
				
				SELECT "state" INTO tSecondCompState FROM "public"."comps" WHERE "id" = iSecondCompId;
				IF tSecondCompState IS NULL THEN RETURN error(-2000, format('comp(%s) not found', iSecondCompId)); END IF;
				
				iInviteId := NULL;
				
				IF tSecondCompState = 'new' THEN
					
					RAISE LOG 'create invite';
					
					jCompInviteCreateResult := sub_comp_invite_create(json_build_object(
						'comp_id',    iSecondCompId,
						'last_name',  cm#>>'{owner_invite,fio}',
						'first_name', '',
						'pat_name',   '',
						'email',      cm#>>'{owner_invite,email}',
						'phone',      cm#>>'{owner_invite,phone}'
					));
					
					IF jCompInviteCreateResult IS NULL THEN RETURN error(-2000, 'sub_comp_invite_create failed'); END IF;
					IF (jCompInviteCreateResult->'err') IS NOT NULL THEN RETURN jCompInviteCreateResult; END IF;
					iInviteId := utils__text2int(jCompInviteCreateResult->>'invite_id');
					IF iInviteId IS NULL THEN RETURN error(-2000, 'sub_comp_invite_create not return invite_id'); END IF;
					
					RAISE LOG 'invite created: %', jCompInviteCreateResult;
					
				END IF;
				
				RAISE LOG 'create request';
				
				BEGIN
					INSERT INTO "comp_relation_requests" ("requestor_comp_id", "requested_comp_id", "relation_type", "comp_from", "comp_to", "comp_invite_id") VALUES (iCompId, iSecondCompId, tpRelationType, iFrom, iTo, iInviteId);
				EXCEPTION
					WHEN OTHERS THEN RETURN error(-1, 'comp relation request already exists');
				END;
				
				jResult := json_build_object('request_id', lastval());
				IF jCompInviteCreateResult IS NOT NULL THEN jResult := utils__j_merge(jResult, jCompInviteCreateResult); END IF;
				RETURN jResult;
				
			ELSE
				RETURN error(-2000, format('invalid tpRelationOption(%s) for comp(%s)', tpRelationOption, iSecondCompId));
		END CASE;
		
	END IF;
	
	CASE (tpRelationType)
		WHEN 'social' THEN
			IF iFrom != iCompId THEN RETURN error(-3, format('cant create `social` relation from(%s) to(%s) when your(%s)', iFrom, iTo, iCompId)); END IF;
		WHEN 'blacklist' THEN
			IF iFrom != iCompId THEN RETURN error(-3, format('cant create `blacklist` relation from(%s) to(%s) when your(%s)', iFrom, iTo, iCompId)); END IF;
		ELSE
	END CASE;
	
	INSERT INTO "comp_relations" ("relation_type", "comp_from", "comp_to") VALUES (tpRelationType, iFrom, iTo);
	
	RETURN json_build_object(
		'relation_id', lastval()
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'comp_relation_create failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		IF (SQLSTATE = '23505') THEN RETURN error(-1, 'comp relation already exists'); END IF;
		IF (SQLSTATE = '23503') THEN RETURN error(-4, 'foreign_key_violation'); END IF;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.comp_relation_create(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_relation_delete(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_relation_delete(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	iRelationId bigint;
	oRec record;
	tRelationType text;
BEGIN
	
	--RAISE LOG 'comp_relation_delete %', cm;
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iRelationId := utils__text2bigint(cm->>'relation_id');
	--RAISE LOG 'iRelationId=%', iRelationId;
	IF (iRelationId IS NULL) THEN RETURN error(-1011, 'relation_id required'); END IF;
	
	SELECT relation_type, comp_from, comp_to INTO oRec FROM comp_relations WHERE (relation_id = iRelationId);
	--RAISE LOG 'oRec=%', oRec;
	IF (NOT FOUND) THEN RETURN error(-1, format('relation(%s) not found', iRelationId)); END IF;
	
	tRelationType := oRec.relation_type::text;
	--RAISE LOG 'user_id=%', i_user_id;
	--RAISE LOG 'tRelationType=%', tRelationType;
	--RAISE LOG ' match1 = %', tRelationType = ANY(ARRAY['trade', 'transport']);
	--RAISE LOG ' match2 = %', tRelationType = ANY(ARRAY['social', 'blacklist']);
	
	IF (tRelationType = ANY(ARRAY['trade', 'transport', 'expedition'])) THEN
		
		IF
			--(perm_test(i_user_id, oRec.comp_from, 'comp_relations_manage') IS NOT TRUE)
			--	AND
			--(perm_test(i_user_id, oRec.comp_to,   'comp_relations_manage') IS NOT TRUE)
			(comp_user_perm_test(i_user_id, oRec.comp_from, const.user_comp_perm__relations_manager()) IS NOT TRUE)
				AND
			(comp_user_perm_test(i_user_id, oRec.comp_to,   const.user_comp_perm__relations_manager()) IS NOT TRUE)
		THEN
			RETURN error(-2, format('perm(%s) required for user(%s) in comp(%s|%s)', 'comp_relations_manage', i_user_id, oRec.comp_from, oRec.comp_to)); END IF;
		
	ELSIF (tRelationType = ANY(ARRAY['social', 'blacklist'])) THEN
		
		IF
			--(perm_test(i_user_id, oRec.comp_from, 'comp_relations_manage') IS NOT TRUE)
			(comp_user_perm_test(i_user_id, oRec.comp_from, const.user_comp_perm__relations_manager()) IS NOT TRUE)
		THEN
			RETURN error(-2, format('perm(%s) required for user(%s) in comp(%s)', 'comp_relations_manage', i_user_id, oRec.comp_from)); END IF;
		
	ELSE
		
		RETURN error(-2, format('no perms, unhandled relation_type(%s)', oRec.relation_type));
		
	END IF;
	
	DELETE FROM comp_relations WHERE (relation_id = iRelationId);
	IF (NOT FOUND) THEN RETURN error(-1, format('relation(%s) not found', iRelationId)); END IF;
	
	RETURN json_build_object();
	
END;$$;


ALTER FUNCTION public.comp_relation_delete(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_state(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_state(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	tINN text;
	tSQL text;
	--oComp record;
	iSelfCompId bigint;
	jComp json;
	aTags text[];
	jUsers json;
	--jJoinRequest json;
	jTenders json;
	jInvitesToTenders json;
	jRequestsForTenders json;
	oTmp record;
	aTmp json[];
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId := utils__text2bigint(cm->>'comp_id');
	tINN := cm->>'inn';
	
	SELECT comp_id INTO iSelfCompId FROM users WHERE (id = i_user_id);
	--RAISE LOG 'iSelfCompId=%', iSelfCompId;
	
	IF (iCompId IS NULL) AND (tINN IS NULL) THEN
		IF (iSelfCompId IS NULL) THEN RETURN error(-1, 'invalid comp_id or inn'); END IF;
		iCompId := iSelfCompId;
	END IF;
	
	--IF (iCompId IS NOT NULL) THEN
	--	SELECT id, name, opf, inn, ogrn, kpp, addr, x, y, email, phone, ati_code, web_site, work_hours, rel_trade_from, rel_trade_to, rel_transport_from, rel_transport_to, hard_tag_trade_from, ymap, dadata, j_doc INTO oComp FROM comps WHERE (id = iCompId);
	--ELSIF (tINN IS NOT NULL) THEN
	--	SELECT id, name, opf, inn, ogrn, kpp, addr, x, y, email, phone, ati_code, web_site, work_hours, rel_trade_from, rel_trade_to, rel_transport_from, rel_transport_to, hard_tag_trade_from, ymap, dadata, j_doc INTO oComp FROM comps WHERE (inn = tINN);
	--END IF;
	--IF (NOT FOUND) THEN RETURN error(-1, format('comp(%s) not found', iCompId)); END IF;
	--IF (iCompId IS NULL) THEN iCompId := oComp.id; END IF;
	--jComp := row_to_json(oComp);
	
	tSQL := 'SELECT json_build_object(
		''id'',                   id,
		''name'',                 name,
		''opf'',                  opf,
		''inn'',                  inn,
		''ogrn'',                 ogrn,
		''kpp'',                  kpp,
		''taxation'',             taxation,
		''addr'',                 addr,
		''x'',                    x,
		''y'',                    y,
		''email'',                email,
		''phone'',                phone,
		''web_site'',             web_site,
		''work_hours'',           work_hours,
		''rel_trade_from'',       rel_trade_from,
		''rel_trade_from'',       rel_trade_to,
		''rel_transport_from'',   rel_transport_from,
		''rel_transport_to'',     rel_transport_to,
		''hard_tag_trade_from'',  hard_tag_trade_from,
		''logo'',                 wrap_comp_logo(logo),
		''ymap'',                 ymap,
		''dadata'',               dadata,
		''state'',                state,
		''info'',                 info,
		''j_doc'',                j_doc
	)
	FROM comps';
	
	IF (iCompId IS NOT NULL)
		THEN tSQL := tSQL || format(' WHERE (id = %L)', iCompId);
		ELSE tSQL := tSQL || format(' WHERE (inn = %L)', tINN);
	END IF;
	
	--RAISE LOG 'tSQL=%', tSQL;
	EXECUTE tSQL INTO jComp;
	IF (jComp IS NULL) THEN RETURN error(-1, 'comp not found'); END IF;
	IF (iCompId IS NULL) THEN iCompId := utils__text2bigint(jComp->>'id'); END IF;
	--RAISE LOG 'iCompId=%', iCompId;
	
	-- tags
	SELECT coalesce(array_agg(tag), '{}') INTO aTags FROM comp_tags WHERE (comp_id = iCompId);
	
	-- users
	SELECT array_agg(json_build_object(
		'id',          users.id,
		'first_name',  first_name,
		'last_name',   last_name,
		'pat_name',    pat_name,
		'icq',         icq,
		'j_doc',       j_doc
	))
	FROM users INTO aTmp
	WHERE (comp_id = iCompId);
	jUsers := array_to_json(aTmp);
	
	-- join_requests
	--SELECT coalesce(json_agg(json_build_object(
	--	'ctime',   ctime,
	--	'mtime',   mtime,
	--	'user_id', user_id,
	--	'state',   state
	--)), '[]')
	--FROM join_requests
	--INTO jJoinRequest
	--WHERE (comp_id = iCompId) AND (state = 0);
	
	-- tenders
	SELECT coalesce(json_agg(json_build_object(
		'id',          t1.tender_id,
		'ctime',       t2.ctime,
		'name',        t2.name,
		'stime',       t2.stime,
		'etime',       t2.etime,
		'organizer',   t2.organizer,
		'requests',    t2.requests,
		'contestants', (
			SELECT coalesce(array_agg(t3.comp_id), '{}')
			FROM rt_comp_tender t3
			WHERE (t3.tender_id = t1.tender_id) AND (t3.comp_id != t1.comp_id)
		),
		'invites',     (
			SELECT coalesce(json_agg(json_build_object(
				'id',      t4.id,
				'comp_id', t4.comp_id,
				'state',   t4.state
			)), '[]')
			FROM tender_invites t4
			WHERE (t4.tender_id = t1.tender_id)
		),
		'requests',     (
			SELECT coalesce(json_agg(json_build_object(
				'id',      t5.id,
				'comp_id', t5.comp_id
			)), '[]')
			FROM tender_join_requests t5
			WHERE (t5.tender_id = t1.tender_id) AND (t5.state = 0)
		),
		'j_doc',       t2.j_doc
	)), '[]')
	FROM rt_comp_tender t1
	INTO jTenders
	LEFT JOIN tenders t2 ON (t2.id = t1.tender_id)
	WHERE (t1.comp_id = iCompId);
	
	-- invites_to_tenders
	SELECT coalesce(json_agg(json_build_object(
		'id',        id,
		'tender_id', tender_id
	)), '[]')
	FROM tender_invites
	INTO jInvitesToTenders
	WHERE (comp_id = iCompId) AND (state = 0);
	
	-- requests_for_tenders
	SELECT coalesce(json_agg(json_build_object(
		'id',        id,
		'tender_id', tender_id,
		'state',     state
	)), '[]')
	FROM tender_join_requests
	INTO jRequestsForTenders
	WHERE (comp_id = iCompId);
	
	/*
	IF (iSelfCompId = iCompId) THEN
		
	ELSE
		
	END IF;
	*/
	
	jComp := utils__j_merge(
		jComp,
		json_build_object(
			'tags',                    aTags,
			'users',                   jUsers,
			'tenders',                 jTenders,
			'invites_to_tenders',      jInvitesToTenders,
			'requests_for_tenders',    jRequestsForTenders
		)
	);
	
	RETURN jComp;
	
END;
$$;


ALTER FUNCTION public.comp_state(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_suggest(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_suggest(dadata json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	jSuggestions json;
	aResult json[];
	aSuggItems json[];
	jSuggItem json;
	jComp json;
	
	tINN text;
	tKPP text;
	tAddr text;
	
	oComp record;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	--RAISE LOG 'comp_suggest: dadata=%', dadata;
	
	jSuggestions := dadata#>'{suggestions}';
	IF (json_typeof(jSuggestions) != 'array') THEN RETURN error(-1, 'invalid suggestions'); END IF;
	
	SELECT array_agg(x) INTO aSuggItems FROM json_array_elements(jSuggestions) x;
	--RAISE LOG 'aSuggItems.length=%', array_length(aSuggItems, 1);
	--RAISE LOG 'aSuggItems=%', aSuggItems;
	
	aResult := ARRAY[]::json[];
	
	FOREACH jSuggItem IN ARRAY aSuggItems LOOP
		--RAISE LOG 'inn=% kpp=% addr=%', jSuggItem#>>'{data,inn}', jSuggItem#>>'{data,kpp}', jSuggItem#>>'{data,address,value}';
		
		jComp := "comp"."get"(json_build_object('inn', jSuggItem#>>'{data,inn}', 'kpp', jSuggItem#>>'{data,kpp}', 'addr', jSuggItem#>>'{data,address,value}'));
		--RAISE LOG 'jComp=%', jComp;
		
		IF ((jComp->>'err') IS NULL) THEN
			aResult := aResult || jComp;
		ELSE
			aResult := aResult || json_build_object('dadata', jSuggItem);
		END IF;
		
	END LOOP;
	
	RETURN json_build_object('suggestions', aResult);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'comp_suggest failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.comp_suggest(dadata json) OWNER TO cargochat_u;

--
-- Name: comp_user_delete(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_user_delete(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	iUserId bigint;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId := utils__text2bigint(cm->>'comp_id');
	iUserId := utils__text2bigint(cm->>'user_id');
	IF (iCompId IS NULL) OR (iUserId IS NULL) THEN RETURN error(-2000, 'invalid params'); END IF;
	
	--IF (perm_test(i_user_id, iCompId, 'comp_user_delete') IS NOT TRUE) THEN RETURN error(-2, 'no perms'); END IF;
	IF (comp_user_perm_test(i_user_id, iCompId, const.user_comp_perm__unlim()) IS NOT TRUE) THEN RETURN error(-2, 'no perms'); END IF;
	
	DELETE FROM rt_user_comp WHERE (comp_id = iCompId) AND (user_id = iUserId);
	IF (NOT FOUND) THEN RETURN error(-1, 'not found'); END IF;
	
	RETURN json_build_object();
	
END;
$$;


ALTER FUNCTION public.comp_user_delete(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_user_move(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_user_move(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	IF (user_perm_test(i_user_id, 'unlimited') IS NOT TRUE) THEN RETURN error(-3, 'no perms'); END IF;
	
	iUserId = utils__text2bigint(cm->>'user_id');
	IF (iUserId IS NULL) THEN RETURN error(-1, 'user_id required'); END IF;
	
	iCompId = utils__text2bigint(cm->>'comp_id');
	IF (iCompId IS NULL) THEN RETURN error(-2, 'comp_id required'); END IF;
	
	DELETE FROM rt_user_comp WHERE (user_id = iUserId);
	INSERT INTO rt_user_comp (user_id, comp_id) VALUES (iUserId, iCompId);
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'comp_user_move failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint;
		IF ((SQLSTATE = '23503') AND (eConstraint = 'user_comp__user_id__fk')) THEN RETURN error(-1, 'user not found'); END IF;
		IF ((SQLSTATE = '23503') AND (eConstraint = 'user_comp__comp_id__fk')) THEN RETURN error(-2, 'comp not found'); END IF;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.comp_user_move(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_user_perm_change(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_user_perm_change(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iPermFlags bigint;
	iCompId bigint;
	iCompPerms bigint;
	iTargetCompId bigint;
	iTargetCompPerms bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iUserId := utils__text2bigint(cm->>'user_id');
	iPermFlags := utils__text2bigint(cm->>'perm_flags');
	IF (iUserId IS NULL) THEN RETURN error(-1, 'user_id required'); END IF;
	IF (iPermFlags IS NULL) THEN RETURN error(-1, 'perm_flags required'); END IF;
	
	SELECT comp_id, comp_flags INTO iCompId, iCompPerms FROM users WHERE (id = i_user_id);
	IF (NOT FOUND) THEN RETURN error(-1, format('user(%s) must be in comp', i_user_id)); END IF;
	
	SELECT comp_id, comp_flags INTO iTargetCompId, iTargetCompPerms FROM users WHERE (id = iUserId);
	IF (NOT FOUND) THEN RETURN error(-1, format('user(%s) not found or must be in comp', iUserId)); END IF;
	
	IF (iCompId != iTargetCompId) THEN RETURN error(-1, format('user(%s) comp(%s) and user(%s) comp(%s) must be in same comp', i_user_id, iCompId, iUserId, iTargetCompId)); END IF;
	IF (iTargetCompPerms = iPermFlags) THEN RETURN json_build_object(); END IF;  -- nothing to change
	--RAISE LOG 'i_user_id=%', i_user_id;
	--RAISE LOG 'iCompPerms=% const.user_comp_perm__unlim()=% chk=%', iCompPerms, const.user_comp_perm__unlim(), "utils"."flgchk"(iCompPerms, const.user_comp_perm__unlim());
	--RAISE LOG 'iCompPerms=% const.user_comp_perm__perms_manager()=% chk=%', iCompPerms, const.user_comp_perm__perms_manager(), "utils"."flgchk"(iCompPerms, const.user_comp_perm__perms_manager());
	IF ("utils"."flgchk"(iCompPerms, const.user_comp_perm__unlim()) IS NOT TRUE) AND ("utils"."flgchk"(iCompPerms, const.user_comp_perm__perms_manager()) IS NOT TRUE) THEN RETURN error(-1, format('user(%s) no perm(%s)', iUserId, const.user_comp_perm__perms_manager())); END IF;
	
	UPDATE users SET comp_flags = iPermFlags WHERE (id = iUserId);
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'comp_user_perm_change failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.comp_user_perm_change(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: comp_user_perm_test(bigint, bigint, bigint); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comp_user_perm_test(i_user_id bigint, i_comp_id bigint, i_perm_mask bigint) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUnlim bigint;
	iCompFlags bigint;
	
BEGIN
	
	--RAISE LOG 'comp_user_perm_test user_id=% comp_id=% i_perm_mask=%', i_user_id, i_comp_id, i_perm_mask;
	
	IF i_user_id IS NULL OR i_comp_id IS NULL OR i_perm_mask IS NULL THEN RETURN FALSE; END IF;
	
	SELECT "comp_flags" INTO iCompFlags FROM "users" WHERE "id" = i_user_id AND "comp_id" = i_comp_id;
	IF NOT FOUND THEN RETURN FALSE; END IF;
	--RAISE LOG 'flags(src)  %', iCompFlags::bit(64);
	--RAISE LOG 'flags(test) %', i_perm_mask::bit(64);
	
	iUnlim = const.user_comp_perm__unlim();
	RETURN (iCompFlags & iUnlim) = iUnlim OR (iCompFlags & i_perm_mask) = i_perm_mask;
	
EXCEPTION
	WHEN others THEN
		RAISE LOG 'comp_user_perm_test failed: %', SQLSTATE;
		RETURN FALSE;
END;$$;


ALTER FUNCTION public.comp_user_perm_test(i_user_id bigint, i_comp_id bigint, i_perm_mask bigint) OWNER TO cargochat_u;

--
-- Name: comps_list(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION comps_list(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE

	aColsDef    text[]  = ARRAY['id'];
	aColsShort  text[]  = ARRAY['id','name','inn','ogrn','kpp','addr','x','y'];
	aColsFull   text[]  = ARRAY['id','name','inn','ogrn','kpp','addr','x','y'];
	aColsSelect text[]  = ARRAY[]::text[];
	aColsNum    text[]  = ARRAY['id',                                 'x','y'];
	aColsTxt    text[]  = ARRAY[     'name','inn','orgn','kpp','addr'];
	--jColsRepl   json    = '{"x":"longitude", "y":"latitude"}';
	jColsRepl   json    = '{}';
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	iFiledsLen bigint;
	aFileds text[];
	iFiledIndex bigint;
	tField text;
	
	aWhere text[];
	oFilters json;
	oFilter json;
	iFilters bigint;
	i bigint;
	tCol text;
	tOp text;
	tVal text;
	fVal double precision;
	tExp text;
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
BEGIN
	--RAISE LOG 'comps_list, time=%s', now();
	--RAISE LOG 'aCols=%', array_to_string(aColsShort,';');
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	IF (tOrderBy IS NULL) OR (NOT (tOrderBy = ANY(aColsShort))) THEN tOrderBy = 'id'; END IF;
	IF (tDir IS NULL) OR (NOT (tDir = ANY(ARRAY['ASC','DESC']))) THEN tDir := 'ASC'; END IF;
	IF (iOffset IS NULL) THEN iOffset = 0; END IF;
	IF (iLimit IS NULL) THEN iLimit = 50; ELSIF (iLimit < 1) THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	iFiledsLen := COALESCE(json_array_length(cm->'fields'), 0);
	IF (iFiledsLen < 1) OR (iFiledsLen > 20) THEN iFiledsLen := 0; END IF;
	--RAISE LOG 'iFiledsLen=%', iFiledsLen;
	
	IF (iFiledsLen = 0) THEN
		aColsSelect := aColsDef;
	ELSE
		FOR iFiledIndex IN 0 .. iFiledsLen-1 LOOP
			tField := cm->'fields'->>iFiledIndex;
			--RAISE LOG 'tField=%', tField;
			IF (tField = ANY(aColsShort)) THEN
				--RAISE LOG 'OK';
				aColsSelect := aColsSelect || tField;
			END IF;
		END LOOP;
		--RAISE LOG 'len=%', array_length(aColsSelect, 1);
		IF (COALESCE(array_length(aColsSelect, 1), 0) = 0) THEN
			aColsSelect := aColsDef;
		END IF;
	END IF;
	--RAISE LOG 'aColsSelect=%', aColsSelect;
	
	aWhere := aWhere || '(NOT deleted)'::text;
	oFilters := json_extract_path(cm, 'filters');
	IF (oFilters IS NOT NULL) THEN
		BEGIN iFilters := coalesce(json_array_length(oFilters), 0);
		EXCEPTION WHEN others THEN iFilters := 0; END;
		FOR i IN 0 .. iFilters-1 LOOP
			oFilter := oFilters->i;
			tCol := oFilter->>'col';
			tVal := oFilter->>'val';
			CONTINUE WHEN (tCol IS NULL) OR (NOT (tCol = ANY(aColsShort))) OR (tVal IS NULL);
			tCol := COALESCE(jColsRepl->>tCol, tCol);
			tExp := NULL;
			IF (tCol = ANY(aColsNum)) THEN
				fVal := utils__text2float(tVal);
				IF (fVal IS NOT NULL) THEN
					CASE oFilter->>'op'
						WHEN 'lt' THEN tExp := '(' || quote_ident(tCol) || ' < ' || fVal || ')';
						WHEN 'gt' THEN tExp := '(' || quote_ident(tCol) || ' > ' || fVal || ')';
						WHEN 'eq' THEN tExp := '(' || quote_ident(tCol) || ' = ' || fVal || ')';
					END CASE;
				END IF;
			ELSIF (tCol = ANY(aColsTxt)) THEN
				--t_f_exp := '(' || quote_ident(t_f_col) || ' ~* E' || quote_literal(t_f_val) || ')';
				tVal := quote_literal(tVal);
				tVal := replace(tVal, '.', '\\.');
				tExp := '(' || quote_ident(tCol) || ' ~* E' || tVal || ')';
			END IF;
			IF (tExp IS NOT NULL) THEN aWhere := aWhere || tExp; END IF;
		END LOOP;
	END IF;
	
	tQuery := 'CREATE TEMP TABLE tmp ON COMMIT DROP AS SELECT ' || array_to_string(aColsFull, ',') || ' FROM comps WHERE ' || array_to_string(aWhere, ' AND ');
	--RAISE LOG 'tQuery=%', tQuery;
	EXECUTE tQuery;
	
	SELECT count(*) FROM tmp INTO iTotal;
	--RAISE LOG 'iTotal=%', iTotal;
	
	aResult := ARRAY[]::json[];
	IF (iTotal > 0) THEN
		tQuery := 'SELECT ' || array_to_string(aColsSelect, ',') || ' FROM tmp ORDER BY ' || quote_ident(tOrderBy) || ' ' || tDir || ' OFFSET ' || iOffset || ' LIMIT ' || iLimit;
		--RAISE LOG 'tQuery=%', tQuery;
		FOR oRec IN EXECUTE tQuery LOOP
			aResult := aResult || row_to_json(oRec);
			--RAISE LOG 'record=%', row_to_json(oRec);
		END LOOP;
	END IF;
	RETURN json_build_object('total', iTotal, 'data', array_to_json(aResult));
END;
$$;


ALTER FUNCTION public.comps_list(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: error(integer, text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION error(code integer, message text) RETURNS json
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
BEGIN
	RETURN json_build_object('err', code, 'msg', message);
END;
$$;


ALTER FUNCTION public.error(code integer, message text) OWNER TO cargochat_u;

--
-- Name: events(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION events(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iLastEventId bigint;
	iMaxEventId bigint;
	aEventIds bigint[];
	aEvents json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	--RAISE LOG 'events %', i_user_id;
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iLastEventId := utils__text2bigint(cm->>'version');
	IF (iLastEventId IS NULL) THEN RETURN error(-1, 'version required'); END IF;
	
	--DELETE FROM events WHERE (sid = t_sid) AND (ctime < (utils__now_utc() - ('5 min'::interval)));
	--DELETE FROM events WHERE (ctime < (utils__now_utc() - ('5 min'::interval)));
	DELETE FROM event_docs WHERE (ctime < (utils__now_utc() - ('5 min'::interval)));
	
	SELECT
		array_agg(event_docs.event_doc_id),
		array_agg(utils__j_merge(event_docs.doc::json, json_build_object('received', event_docs.received_cnt))),
		max(event_id)
	INTO
		aEventIds,
		aEvents,
		iMaxEventId
	FROM events
	LEFT JOIN event_docs ON (event_docs.event_doc_id = events.event_doc_id)
	WHERE (sid = t_sid) AND (event_id > iLastEventId);
	--RAISE LOG 'aEventIds=% aEvents=%', aEventIds, aEvents;
	
	IF (aEvents IS NULL) OR (coalesce(array_length(aEvents, 1), 0) < 1) THEN
		-- событий не найдено
		RETURN json_build_object('events', json_build_array(), 'version', iLastEventId);
	END IF;
	
	-- обновляем счетчик забираний событий
	UPDATE event_docs SET received_cnt = received_cnt + 1 WHERE (event_doc_id = ANY(aEventIds));
	
	RETURN json_build_object('events', aEvents, 'version', iMaxEventId);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'events failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.events(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: file_get(text, text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION file_get(t_token text, t_ipaddr text) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	jFile json;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'file_get % %', t_token, t_ipaddr;
	
	SELECT json_build_object(
		'id', id,
		'name', name,
		'size', size
	)
	INTO jFile
	FROM files
	WHERE (token = t_token) AND (NOT deleted);
	
	IF (NOT FOUND) THEN RETURN error(-1, 'not found'); END IF;
	
	RETURN jFile;

EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'main file_get: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));	
END;
$$;


ALTER FUNCTION public.file_get(t_token text, t_ipaddr text) OWNER TO cargochat_u;

--
-- Name: generate_key(); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION generate_key() RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
	tKey text;
	iRetrys integer;
BEGIN
	iRetrys := 10;
	LOOP
		BEGIN
			tKey := md5(get_const('salt_key') || random()::text);
			INSERT INTO keys (key) VALUES (tKey);
		EXCEPTION
			WHEN unique_violation THEN
				tKey := NULL;
				iRetrys := iRetrys - 1;
				IF (iRetrys = 0) THEN
					RETURN NULL;
				END IF;
			WHEN others THEN
				RETURN NULL;
		END;
		IF (tKey IS NOT NULL) THEN
			RETURN tKey;
		END IF;
	END LOOP;
	RETURN NULL;
END;
$$;


ALTER FUNCTION public.generate_key() OWNER TO cargochat_u;

--
-- Name: generate_sid(); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION generate_sid() RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tSid text;
	iRetrys integer;
	
BEGIN
	
	iRetrys := 10;
	
	LOOP
		BEGIN
			tSid := md5(get_const('salt_sid') || random()::text);
			INSERT INTO sessions (sid) VALUES (tSid);
		EXCEPTION
			WHEN unique_violation THEN
				tSid := NULL;
				iRetrys := iRetrys - 1;
				IF (iRetrys = 0) THEN
					RETURN NULL;
				END IF;
			WHEN others THEN
				RETURN NULL;
		END;
		IF (tSid IS NOT NULL) THEN
			RETURN tSid;
		END IF;
	END LOOP;
	
	RETURN NULL;
	
END;
$$;


ALTER FUNCTION public.generate_sid() OWNER TO cargochat_u;

--
-- Name: get_const(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION get_const(t_key text) RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
	tVal text;
BEGIN
	SELECT "value" INTO tVal FROM "public"."const" WHERE "key" = t_key;
	IF NOT FOUND THEN RETURN ''; END IF;
	RETURN tVal;
END;
$$;


ALTER FUNCTION public.get_const(t_key text) OWNER TO cargochat_u;

--
-- Name: get_perm(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION get_perm(t_alias text) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
	iType bigint;
BEGIN
	SELECT type INTO iType FROM perm_types WHERE (alias = t_alias);
	RETURN iType;
END;
$$;


ALTER FUNCTION public.get_perm(t_alias text) OWNER TO cargochat_u;

--
-- Name: main(text, text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION main(cmd text, ip_addr text) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	oRes JSON;

	j_cm JSON;
	j_cl JSON;
	t_cm TEXT;
	t_sid TEXT;
	i_sid_id BIGINT;
	i_user_id BIGINT;
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN

/*
 oRes := common.main(cmd);
 if ((oRes->>'err')::BIGINT <> -1010) then
  return oRes;
 end if;
*/
	
	RAISE LOG '---------------------------------------------------';
	RAISE LOG '-------- main ip_addr=% cmd=%', ip_addr, cmd;
	
	BEGIN j_cm := cmd::JSON;
	EXCEPTION WHEN OTHERS THEN RETURN error(-1010, 'invalid cm'); END;
	
	t_cm := j_cm->>'cm';
	IF t_cm IS NULL THEN RETURN error(-1010, 'undefined cm'); END IF;
	
	-- commands witout sid
	CASE t_cm
		WHEN 'user_reg'                   THEN RETURN user_reg(j_cm);
		WHEN 'user_activate'              THEN RETURN user_activate(j_cm);
		WHEN 'user_get_key_a'             THEN RETURN user_get_key_a(j_cm);
		WHEN 'user_change_passw'          THEN RETURN user_change_passw(j_cm);
		WHEN 'user_get_key_b'             THEN RETURN user_get_key_b(j_cm);
		WHEN 'user_change_email'          THEN RETURN user_change_email(j_cm);
		WHEN 'user_login'                 THEN RETURN "user"."login"(j_cm, FALSE);
		WHEN 'user_enter'                 THEN RETURN "user"."enter"(j_cm);
		WHEN 'check_unique'               THEN RETURN check_unique(j_cm);
		WHEN 'comp_invite_get'            THEN RETURN "comp"."invite_get"(j_cm);
		WHEN 'comp_invite_sms'            THEN RETURN "comp"."invite_sms"(j_cm);
		WHEN 'comp_invite_accept'         THEN RETURN "comp"."invite_accept"(j_cm);
		WHEN 'user_invite_get'            THEN RETURN "user"."invite_get"(j_cm);
		WHEN 'user_invite_sms'            THEN RETURN "user"."invite_sms"(j_cm);
		WHEN 'user_invite_accept'         THEN RETURN "user"."invite_accept"(j_cm);
		WHEN 'lead_reg'                   THEN RETURN "lead"."reg"(j_cm, ip_addr);
		WHEN 'user_passw_recovery'        THEN RETURN "user"."passw_recovery"(j_cm, ip_addr);
		WHEN 'sms'                        THEN RETURN "public"."sms"(j_cm, ip_addr);
		WHEN 'comp_check'                 THEN RETURN "comp"."check"(j_cm, ip_addr);
	ELSE
	END CASE;
	
	-- require sid
	t_sid := j_cm->>'sid';
	IF t_sid IS NULL THEN RETURN error(-1011, 'sid required'); END IF;
	
	-- check sid
	SELECT
		"s"."id",
		"s"."user_id",
		json_build_object(
			'sid_id',   "s"."id",
			'sid',      "s"."sid",
			'user_id',  "s"."user_id",
			'comp_id',  (SELECT "comp_id" FROM "public"."users" WHERE "id" = "s"."user_id")
		)
	INTO
		i_sid_id,
		i_user_id,
		j_cl
	FROM "sessions" "s"
	WHERE "sid" = t_sid;
	
	IF NOT FOUND THEN RETURN error(-1011, format('invalid sid(%s)', t_sid)); END IF;
	
	-- sid passed
	--RAISE LOG 'i_sid_id=% t_sid=% i_user_id=%', i_sid_id, t_sid, i_user_id;
	RAISE LOG 'j_cl=%', j_cl;
	UPDATE "public"."sessions" SET "mtime" = "utils"."now_utc"(), "updated" = "updated" + 1, "ip" = ip_addr WHERE "id" = i_sid_id;
	
	-- commands required sid (authorized user)
	CASE t_cm
		
		--WHEN 'join_request_create'            THEN RETURN join_request_create(i_user_id, t_sid, j_cm);
		--WHEN 'join_request_delete'            THEN RETURN join_request_delete(i_user_id, t_sid, j_cm);
		--WHEN 'join_request_accept'            THEN RETURN join_request_accept(i_user_id, t_sid, j_cm);
		--WHEN 'join_request_refuse'            THEN RETURN join_request_refuse(i_user_id, t_sid, j_cm);
		--WHEN 'comp_create'                    THEN RETURN comp_create(i_user_id, t_sid, j_cm);
		
		--WHEN 'events'                         THEN RETURN events                 (i_user_id, t_sid, j_cm);  -- deprecated
		
		WHEN 'social_bind'                    THEN RETURN social_bind            (i_user_id, t_sid, j_cm);
		WHEN 'social_facebook_unbind'         THEN RETURN social_facebook_unbind (i_user_id, t_sid, j_cm);
		WHEN 'social_linkedin_unbind'         THEN RETURN social_linkedin_unbind (i_user_id, t_sid, j_cm);
		
		WHEN 'comp_create2'                   THEN RETURN comp_create2           (i_user_id, t_sid, j_cm);
		WHEN 'comp_invite_create'             THEN RETURN "comp"."invite_create" (j_cl, j_cm);
		WHEN 'comp_user_move'                 THEN RETURN comp_user_move         (i_user_id, t_sid, j_cm);
		WHEN 'comp_state'                     THEN RETURN comp_state             (i_user_id, t_sid, j_cm);
		WHEN 'comp_update'                    THEN RETURN "comp"."update"        (j_cl, j_cm);
		WHEN 'comp_delete'                    THEN RETURN comp_delete            (i_user_id, t_sid, j_cm);
		WHEN 'comp_logo_delete'               THEN RETURN comp_logo_delete       (i_user_id, t_sid, j_cm);
		WHEN 'comp_logo_upsert'               THEN RETURN comp_logo_upsert       (i_user_id, t_sid, j_cm);
		WHEN 'comp_relation_create'           THEN RETURN comp_relation_create   (i_user_id, t_sid, j_cm);
		WHEN 'comp_relation_delete'           THEN RETURN comp_relation_delete   (i_user_id, t_sid, j_cm);
		WHEN 'comp_user_detele'               THEN RETURN comp_user_detele       (i_user_id, t_sid, j_cm);
		WHEN 'comp_user_perm_change'          THEN RETURN comp_user_perm_change  (i_user_id, t_sid, j_cm);
		WHEN 'comps_list'                     THEN RETURN comps_list             (i_user_id, t_sid, j_cm);
		
		WHEN 'comp_relation_request_delete'   THEN RETURN "comp"."relation_request_delete" (j_cl, j_cm);
		WHEN 'comp_relation_request_accept'   THEN RETURN "comp"."relation_request_accept" (j_cl, j_cm);
		WHEN 'comp_relation_request_refuse'   THEN RETURN "comp"."relation_request_refuse" (j_cl, j_cm);
		WHEN 'comp_rel_list'                  THEN RETURN "comp"."rel_list"                (j_cl, j_cm);
		WHEN 'comp_rel_req_list'              THEN RETURN "comp"."rel_req_list"            (j_cl, j_cm);
		WHEN 'comp_rel_summary'               THEN RETURN "comp"."rel_summary"             (j_cl, j_cm);
		WHEN 'comp_invites_list'              THEN RETURN "comp"."invites_list"            (j_cl, j_cm);
		--WHEN 'comp_list'                      THEN RETURN "public"."comp_list"(j_cl, j_cm);
		
		--WHEN 'perms_get'                      THEN RETURN perms_get(i_user_id, t_sid, j_cm);
		--WHEN 'perms_set'                      THEN RETURN perms_set(i_user_id, t_sid, j_cm);
		
		WHEN 'price_request_bet_create'       THEN RETURN "price_req"."bet_create"      (j_cl, j_cm);
		WHEN 'price_request_bookmark_create'  THEN RETURN "price_req"."bookmark_create" (j_cl, j_cm);
		WHEN 'price_request_bookmark_delete'  THEN RETURN "price_req"."bookmark_delete" (j_cl, j_cm);
		WHEN 'price_request_create'           THEN RETURN "price_req"."create"          (j_cl, j_cm);
		WHEN 'price_request_delete'           THEN RETURN "price_req"."delete"          (j_cl, j_cm);
		WHEN 'price_request_received_delete'  THEN RETURN "price_req"."received_delete" (j_cl, j_cm);
		WHEN 'price_requests_list'            THEN RETURN "price_req"."list"            (j_cl, j_cm);
		WHEN 'price_request_bets_list'        THEN RETURN "price_req"."bets_list"       (j_cl, j_cm);
		
		WHEN 'tender_create'                  THEN RETURN tender_create              (i_user_id, t_sid, j_cm);
		WHEN 'tender_update'                  THEN RETURN tender_update              (i_user_id, t_sid, j_cm);
		WHEN 'tender_delete'                  THEN RETURN tender_delete              (i_user_id, t_sid, j_cm);
		WHEN 'tender_invite_create'           THEN RETURN tender_invite_create       (i_user_id, t_sid, j_cm);
		WHEN 'tender_invite_delete'           THEN RETURN tender_invite_delete       (i_user_id, t_sid, j_cm);
		WHEN 'tender_invite_accept'           THEN RETURN tender_invite_accept       (i_user_id, t_sid, j_cm);
		WHEN 'tender_invite_refuse'           THEN RETURN tender_invite_refuse       (i_user_id, t_sid, j_cm);
		WHEN 'tender_join_request_create'     THEN RETURN tender_join_request_create (i_user_id, t_sid, j_cm);
		WHEN 'tender_join_request_delete'     THEN RETURN tender_join_request_delete (i_user_id, t_sid, j_cm);
		WHEN 'tender_join_request_accept'     THEN RETURN tender_join_request_accept (i_user_id, t_sid, j_cm);
		WHEN 'tender_join_request_refuse'     THEN RETURN tender_join_request_refuse (i_user_id, t_sid, j_cm);
		WHEN 'tenders_list'                   THEN RETURN tenders_list               (i_user_id, t_sid, j_cm);
		
		WHEN 'msg_channel_create'             THEN RETURN "channels"."create"    (j_cl, j_cm);
		WHEN 'msg_channel_delete'             THEN RETURN "channels"."delete"    (j_cl, j_cm);
		WHEN 'msg_channel_hist_list'          THEN RETURN "channels"."hist_list" (j_cl, j_cm);
		WHEN 'msg_channel_users'              THEN RETURN msg_channel_users      (i_user_id, t_sid, j_cm);
		WHEN 'msg_channel_invite'             THEN RETURN "channels"."invite"    (j_cl, j_cm);
		WHEN 'msg_channel_join'               THEN RETURN "channels"."join"      (j_cl, j_cm);
		WHEN 'msg_channel_leave'              THEN RETURN msg_channel_leave      (i_user_id, t_sid, j_cm);
		WHEN 'msg_channel_send'               THEN RETURN msg_channel_send       (i_user_id, t_sid, j_cm);
		WHEN 'msg_channel_erase'              THEN RETURN "channels"."erase"     (j_cl, j_cm);
		WHEN 'msg_channel_correct'            THEN RETURN "channels"."correct"   (j_cl, j_cm);
		WHEN 'msg_channel_readed'             THEN RETURN "channels"."readed"    (j_cl, j_cm);
		WHEN 'msg_channels_list'              THEN RETURN "channels"."list"      (j_cl, j_cm);
		
		WHEN 'msg_private_hist'               THEN RETURN msg_private_hist       (i_user_id, t_sid, j_cm);
		WHEN 'msg_private_send'               THEN RETURN msg_private_send       (i_user_id, t_sid, j_cm);
		WHEN 'msg_private_hist_list'          THEN RETURN "privates"."hist_list" (j_cl, j_cm);
		WHEN 'msg_private_readed'             THEN RETURN msg_private_readed     (i_user_id, t_sid, j_cm);
		WHEN 'msg_privates_list'              THEN RETURN "privates"."list"      (j_cl, j_cm);
		
		WHEN 'user_sessions'                  THEN RETURN user_sessions          (i_user_id, t_sid, j_cm);
		WHEN 'user_auths'                     THEN RETURN user_auths             (i_user_id, t_sid, j_cm);
		WHEN 'user_logout'                    THEN RETURN user_logout            (i_user_id, t_sid, j_cm);
		WHEN 'user_state'                     THEN RETURN user_state             (i_user_id, t_sid, j_cm);
		WHEN 'user_contact_add'               THEN RETURN user_contact_add       (i_user_id, t_sid, j_cm);
		WHEN 'user_contact_rem'               THEN RETURN user_contact_rem       (i_user_id, t_sid, j_cm);
		WHEN 'user_update'                    THEN RETURN user_update            (i_user_id, t_sid, j_cm);
		WHEN 'user_info'                      THEN RETURN user_info              (i_user_id, t_sid, j_cm);
		WHEN 'user_invite_create'             THEN RETURN "user"."invite_create" (j_cl, j_cm);
		WHEN 'user_invite_delete'             THEN RETURN "user"."invite_delete" (j_cl, j_cm);
		WHEN 'users_list'                     THEN RETURN "user"."list"          (j_cl, j_cm);
		WHEN 'user_contacts_list'             THEN RETURN "user"."contacts_list" (j_cl, j_cm);
		WHEN 'user_get_by_sid'                THEN RETURN user_get_by_sid        (j_cl, j_cm);
		
		WHEN 'temp_file_create'               THEN RETURN temp_file_create       (i_sid_id, i_user_id, j_cm);
		
		WHEN 'vehicle_manage'                 THEN RETURN "vehicle"."manage"     (j_cl, j_cm);
		WHEN 'vehicles_list'                  THEN RETURN "vehicle"."list"       (j_cl, j_cm);
		
		WHEN 'lead_list'                      THEN RETURN "lead"."list"          (j_cl, j_cm);
		
		WHEN 'lplace_manage'                  THEN RETURN "lplace"."manage"      (j_cl, j_cm);
		WHEN 'lplaces_list'                   THEN RETURN "lplace"."list"        (j_cl, j_cm);
		
		WHEN 'order_manage'                   THEN RETURN "order"."manage"       (j_cl, j_cm);
		WHEN 'order_state_flow'               THEN RETURN "order"."state_flow"   (j_cl, j_cm);
		WHEN 'order_state_close'              THEN RETURN "order"."state_close"  (j_cl, j_cm);
		WHEN 'orders_list'                    THEN RETURN "order"."list"         (j_cl, j_cm);
		WHEN 'order_offer_create'             THEN RETURN "order"."offer_create" (j_cl, j_cm);
		WHEN 'order_offer_bid'                THEN RETURN "order"."offer_bid"    (j_cl, j_cm);
		WHEN 'order_memo'                     THEN RETURN "order"."memo"         (j_cl, j_cm);
		WHEN 'order_offers_list'              THEN RETURN "order"."offers_list"  (j_cl, j_cm);
		WHEN 'order_archive'                  THEN RETURN "order"."archive"      (j_cl, j_cm);
		WHEN 'order_export'                   THEN RETURN "order"."export"       (j_cl, j_cm);
		WHEN 'order_import'                   THEN RETURN "order"."import"       (j_cl, j_cm);
		
	ELSE
	END CASE;
	
	RETURN error(-1010, format('unhandled cm(%s)', t_cm));
	
EXCEPTION
	WHEN others THEN
		--ERRCODES-TABLE: http://www.postgresql.org/docs/9.4/static/errcodes-appendix.html#ERRCODES-TABLE
		--stack vars: http://www.postgresql.org/docs/9.4/static/plpgsql-control-structures.html#PLPGSQL-EXCEPTION-DIAGNOSTICS-VALUES
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'main failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.main(cmd text, ip_addr text) OWNER TO cargochat_u;

--
-- Name: msg_channel_leave(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION msg_channel_leave(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iChannelId bigint;
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	-- выход из канала
	
	--RAISE LOG 'msg_channel_leave %', i_user_id;
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iChannelId := utils__text2bigint(cm->>'channel_id');
	IF (iChannelId IS NULL) THEN RETURN error(-1, 'channel_id required'); END IF;
	
	DELETE FROM msg_channel_users WHERE (channel_id = iChannelId) AND (user_id = i_user_id);
	IF (NOT FOUND) THEN RETURN error(-1, format('channel(%s) and user(%s) relation not found', iChannelId, i_user_id)); END IF;
	
	-- достаем сессии юзеров которые сейчас сидят в канале
	SELECT array_agg(ses.sid)
	INTO aSids
	FROM msg_channel_users mcu
	LEFT JOIN sessions ses ON (ses.user_id = mcu.user_id)
	WHERE (mcu.channel_id = iChannelId);
	--RAISE LOG 'aSids=%', aSids;
	
	IF (aSids IS NOT NULL) AND (array_length(aSids, 1) > 0) THEN
		
		-- готовим событие upsert юзера
		jEvent := json_build_object(
			'type',       'msg_channel_user_leave',
			'channel_id', iChannelId,
			'user_id',    i_user_id
		);
		--RAISE LOG 'jEvent=%', jEvent;
		
		PERFORM sub_event_add(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;
	
	RETURN json_build_object(
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'msg_channel_leave failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.msg_channel_leave(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: msg_channel_send(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION msg_channel_send(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iChannelId bigint;
	tBody text;
	iChannelUserId bigint;
	iChannelUserFlags bigint;
	
	iMessageId bigint;
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	--RAISE LOG 'msg_channel_send %', i_user_id;
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iChannelId := utils__text2bigint(cm->>'channel_id');  -- channel_id назначения
	tBody := cm->>'body';  -- текст сообщения
	IF (iChannelId IS NULL) THEN RETURN error(-1, 'channel_id required'); END IF;
	IF (tBody IS NULL) THEN RETURN error(-1, 'body required'); END IF;
	
	SELECT channel_user_id, flags INTO iChannelUserId, iChannelUserFlags FROM msg_channel_users WHERE (channel_id = iChannelId) AND (user_id = i_user_id);
	IF (NOT FOUND) THEN RETURN error(-1, format('user(%s) and channel(%s) relation not found', i_user_id, iChannelId)); END IF;
	
	IF ("utils"."flgchk"(iChannelUserFlags, const.msg_ch_user_flg__just_invited()) IS TRUE) THEN
		RETURN error(-1, format('user(%s) must have no flag "just_invited" for send in channel(%s)', i_user_id, iChannelId));
	END IF;
	
	-- обновляем счетчик непрочитанных сообщений
	UPDATE msg_channel_users SET unreaded = unreaded + 1 WHERE (channel_id = iChannelId) AND (user_id != i_user_id);
	
	-- добавляем сообщение в историю
	INSERT INTO msg_channels_hist (channel_id, user_id, message_body) VALUES (iChannelId, i_user_id, tBody);
	iMessageId := lastval();
	
	-- достаем сессии юзеров которые сейчас сидят в канале
	SELECT ARRAY_AGG("ses"."sid")
	INTO aSids
	FROM "public"."msg_channel_users" "mcu"
	LEFT JOIN "public"."sessions" "ses" ON "ses"."user_id" = "mcu"."user_id"
	WHERE "mcu"."channel_id" = iChannelId;
	--RAISE LOG 'aSids=%', aSids;
	
	IF aSids IS NOT NULL AND COALESCE(array_length(aSids, 1), 0) > 0 THEN
		
		-- готовим событие сообщения
		SELECT json_build_object(
			'type',       'msg_channel_new',
			'id',         iMessageId,
			'channel_id', iChannelId,
			'ts',         utils__ts2int(utils__now_utc()),
			'user_id',    i_user_id,
			'first_name', users.first_name,
			'last_name',  users.last_name,
			'comp_id',    users.comp_id,
			'comp_name',  comps.name,
			'body',       tBody
		)::jsonb
		INTO jEvent
		FROM users
		LEFT JOIN comps ON (comps.id = users.comp_id)
		WHERE (users.id = i_user_id);
		--RAISE LOG 'jEvent=%', jEvent;
		
		PERFORM sub_event_add(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;
	
	RETURN json_build_object(
		'message_id', iMessageId,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'msg_channel_send failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.msg_channel_send(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: msg_channel_users(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION msg_channel_users(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	aUsers json[] = ARRAY[]::json[];
	
	iChannelId bigint;
	iChannelUserId bigint;
	iChannelUserFlags bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	--RAISE LOG 'msg_channel_users %', i_user_id;
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iChannelId := utils__text2bigint(cm->>'channel_id');
	IF (iChannelId IS NULL) THEN RETURN error(-1, 'channel_id required'); END IF;
	
	SELECT channel_user_id, flags INTO iChannelUserId, iChannelUserFlags FROM msg_channel_users WHERE (channel_id = iChannelId) AND (user_id = i_user_id);
	IF (NOT FOUND) THEN RETURN error(-1, format('user(%s) and channel(%s) relation not found', i_user_id, iChannelId)); END IF;
	--RAISE LOG 'iChannelUserId=% iChannelUserFlags=%', iChannelUserId, iChannelUserFlags;
	
	IF ("utils"."flgchk"(iChannelUserFlags, const.msg_ch_user_flg__just_invited()) IS TRUE) THEN
		RETURN error(-1, format('user(%s) must have no flag "just_invited" for access channel(%s) history', i_user_id, iChannelId));
	END IF;
	
	SELECT coalesce(array_agg(json_build_object(
		'user_id',      u1.id,
		'first_name',   u1.first_name,
		'last_name',    u1.last_name,
		'comp_id',      u1.comp_id,
		'comp_name',    c1.name,
		'flags',        mcu2.flags
	)), ARRAY[]::json[])
	INTO aUsers
	FROM msg_channel_users mcu2
	LEFT JOIN users u1 ON (u1.id = mcu2.user_id)
	LEFT JOIN comps c1 ON (c1.id = u1.comp_id)
	WHERE (mcu2.channel_id = iChannelId);
	
	RETURN json_build_object('users', aUsers);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'msg_channel_users failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.msg_channel_users(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: msg_channels_list(bigint, bigint, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION msg_channels_list(i_sid_id bigint, i_user_id bigint, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":        {"select": "cu.channel_id",  "alias": "id",        "type": "number"},
			"title":     {"select": "title",                                "type": "text"},
			"unreaded":  {"select": "cu.unreaded",                          "type": "number"},
			"lrm":       {"select": "cu.lrm_id",      "alias": "lrm",       "type": "number"},
			"flags":     {"select": "cu.flags",                             "type": "number"},
			"comp_id":   {"select": "co.id",          "alias": "comp_id",   "type": "number"},
			"comp_name": {"select": "co.name",        "alias": "comp_name", "type": "text"},
			"users":     {"select": "ch.users",                             "type": "number"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'msg_channels_list';
	
	IF (i_user_id IS NULL) OR (i_sid_id IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	SELECT comp_id INTO iCompId FROM users WHERE (id = i_user_id);
	IF (iCompId IS NULL) THEN RETURN error(-1, format('user(%s) must have comp', i_user_id)); END IF;
	--RAISE LOG 'iCompId=%', iCompId;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	
	IF (tOrderBy IS NULL) OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF (tDir IS NULL) OR (NOT (tDir = ANY(ARRAY['ASC','DESC']))) THEN tDir := 'ASC'; END IF;
	IF (iOffset IS NULL) THEN iOffset = 0; END IF;
	IF (iLimit IS NULL) THEN iLimit = 50; ELSIF (iLimit < 1) THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	--RAISE LOG 'aFields=% len=%', aFields, array_length(aFields, 1);
	IF (coalesce(array_length(aFields, 1), 0) > 0) THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF (jField IS NOT NULL) THEN
				IF ((jField->>'alias') IS NULL) THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF (coalesce(array_length(aSelection, 1), 0) < 1) THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF ((jField->>'alias') IS NULL) THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	RAISE LOG 'aSelection=%', aSelection;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF (aFilters IS NOT NULL) THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			--RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			--CONTINUE WHEN (json_typeof(jFilter) != 'object');
			CONTINUE WHEN (json_typeof(jFilter) != 'array') OR (json_array_length(jFilter) != 3);
			--RAISE LOG 'json_array_length=%', json_array_length(jFilter);
			--RAISE LOG 'json_array: col=% op=% val=%', jFilter->>0, jFilter->>1, jFilter->>2;
			
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			--RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			tColFilter := jCfg->'fields'->tCol->>'select';
			--RAISE LOG 'tColFilter=%', tColFilter;
			CONTINUE WHEN (tCol IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	-- FILTERING into temp table
	
	tQuery := '
		CREATE TEMP TABLE tmp1 ON COMMIT DROP AS
		SELECT cu."channel_id" __key__
		FROM msg_channel_users cu
		LEFT JOIN "msg_channels" ch ON ch.channel_id = cu.channel_id
		LEFT JOIN "users" ON "users"."id" = ch.creator_user_id
		LEFT JOIN "comps" co ON co.id = "users"."comp_id"';
	
	aWhere := aWhere || format('cu.user_id = %L', i_user_id);
	
	IF (coalesce(array_length(aWhere, 1), 0) > 0) THEN
		tQuery := tQuery || format(' WHERE %s', array_to_string(aWhere, ' AND '));
	END IF;
	
	RAISE LOG 'tQuery: %', tQuery;
	EXECUTE tQuery;
	
	SELECT count(*) FROM tmp1 INTO iTotal;
	--RAISE LOG 'iTotal=%', iTotal;
	
	-- ORDERING & PAGENATION 
	
	aResult := ARRAY[]::json[];
	IF (iTotal > 0) THEN
		tQuery := format('
			SELECT array_agg(row_to_json(sub1)) FROM (
				SELECT %s
				FROM tmp1
				LEFT JOIN msg_channels ch ON tmp1.__key__ = ch."channel_id"
				LEFT JOIN msg_channel_users cu ON cu.channel_id = ch.channel_id AND cu.user_id = %L
				LEFT JOIN "users" ON "users"."id" = ch.creator_user_id
				LEFT JOIN "comps" co ON co.id = "users"."comp_id"
				ORDER BY %s %s OFFSET %L LIMIT %L
			) sub1',
			array_to_string(aSelection, ', '),
			i_user_id, tOrderBy, tDir, iOffset, iLimit
		);
		RAISE LOG 'tQuery: %', tQuery;
		EXECUTE tQuery INTO aResult;
	END IF;
	
	RETURN json_build_object('total', iTotal, 'data', array_to_json(aResult));
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'msg_channels_list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.msg_channels_list(i_sid_id bigint, i_user_id bigint, cm json) OWNER TO cargochat_u;

--
-- Name: msg_private_hist(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION msg_private_hist(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	aHist json[] = ARRAY[]::json[];
	
	iUserId bigint;
	iPrivateId bigint;
	iLastReadedMessageId bigint;
	iInterlocutorLastReadedMessageId bigint;
	iInterlocutorLastReadedMessageTs bigint;
	tsFrom timestamp without time zone;
	tsTo timestamp without time zone;
	iLimit bigint;
	iOffset bigint;
	
	tSQL text;
	jMessage json;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	--RAISE LOG 'msg_private_hist %', i_user_id;
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iUserId := utils__text2bigint(cm->>'user_id');
	tsFrom  := utils__int2utc(utils__text2int(cm->>'ts_from'));
	tsTo    := utils__int2utc(utils__text2int(cm->>'ts_to'));
	iLimit  := utils__text2bigint(cm->>'limit');
	iOffset := utils__text2bigint(cm->>'offset');
	IF iUserId IS NULL THEN RETURN error(-1, 'user_id required'); END IF;
	IF i_user_id = iUserId THEN RETURN error(-1, 'user_id must be other user'); END IF;
	IF tsFrom IS NOT NULL AND tsTo IS NOT NULL AND tsFrom > tsTo THEN RETURN error(-1, 'invalid interval'); END IF;
	IF iLimit IS NULL OR iLimit > 500 THEN iLimit := 500; END IF;
	IF iOffset IS NULL OR iOffset < 0 THEN iOffset := 0; END IF;
	
	IF (i_user_id < iUserId) THEN
		SELECT private_id, user1_lrm_id,         user2_lrm_id,                     utils__ts2int(user2_lrm_ts)
		INTO   iPrivateId, iLastReadedMessageId, iInterlocutorLastReadedMessageId, iInterlocutorLastReadedMessageTs
		FROM   msg_privates
		WHERE  user1_id = i_user_id AND user2_id = iUserId;
	ELSE
		SELECT private_id, user2_lrm_id,         user1_lrm_id,                     utils__ts2int(user1_lrm_ts)
		INTO   iPrivateId, iLastReadedMessageId, iInterlocutorLastReadedMessageId, iInterlocutorLastReadedMessageTs
		FROM   msg_privates
		WHERE  user1_id = iUserId AND user2_id = i_user_id;
	END IF;
	
	IF (iPrivateId IS NOT NULL) THEN
			
		--RAISE LOG 'iPrivateId=% iLastReadedMessageId=%', iPrivateId, iLastReadedMessageId;
		
		tSQL := 'SELECT json_build_object(
			''id'',       message_id,
			''ts'',       utils__ts2int(msg_private_hist.ctime),
			''user_id'',  user_id,
			''body'',     message_body
		)
		FROM msg_private_hist
		WHERE (private_id = ' || iPrivateId || ')';
		
		IF tsFrom IS NOT NULL THEN tSQL := format('%s AND (ctime >= %L)', tSQL, tsFrom); END IF;
		IF tsTo IS NOT NULL   THEN tSQL := format('%s AND (ctime <= %L)', tSQL, tsTo + '1 sec'::interval); END IF;
		tSQL := format('%s ORDER BY message_id DESC LIMIT %L OFFSET %L', tSQL, iLimit, iOffset);
		RAISE LOG 'tSQL=%', tSQL;
		
		FOR jMessage IN EXECUTE tSQL LOOP
			aHist := jMessage || aHist;
		END LOOP;
		--RAISE LOG 'aHist=%', aHist;
		
	END IF;
	
	RETURN json_build_object(
		'private_id',           iPrivateId,
		'hist',                 aHist,
		'lrm_id',               iLastReadedMessageId,
		'interlocutor_lrm_id',  iInterlocutorLastReadedMessageId,
		'interlocutor_lrm_ts',  iInterlocutorLastReadedMessageTs
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'msg_private_hist failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.msg_private_hist(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: msg_private_readed(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION msg_private_readed(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iMessageId bigint;
	iPrivateId bigint;
	iLRMId bigint;
	iUnreaded bigint;
	tsNow timestamp without time zone;
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	--RAISE LOG 'msg_private_readed %', i_user_id;
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iUserId := utils__text2bigint(cm->>'user_id');
	iMessageId := utils__text2bigint(cm->>'message_id');
	IF (iUserId IS NULL) THEN RETURN error(-1, 'user_id required'); END IF;
	IF (i_user_id = iUserId) THEN RETURN error(-1, 'user_id must be other user'); END IF;
	--IF (iMessageId IS NULL) THEN RETURN error(-1, 'message_id required'); END IF;
	
	IF (i_user_id < iUserId) THEN
		SELECT private_id, user1_lrm_id INTO iPrivateId, iLRMId FROM msg_privates WHERE (user1_id = i_user_id) AND (user2_id = iUserId);
	ELSE
		SELECT private_id, user2_lrm_id INTO iPrivateId, iLRMId FROM msg_privates WHERE (user1_id = iUserId) AND (user2_id = i_user_id);
	END IF;
	
	IF (NOT FOUND) THEN RETURN error(-1, format('private(%s) and user(%s) relation not found', i_user_id, iUserId)); END IF;
	--RAISE LOG 'iPrivateId=% iMessageId=% iLRMId=%', iPrivateId, iMessageId, iLRMId;
	
	IF ((iMessageId IS NULL) AND (iLRMId IS NULL)) OR (iMessageId = iLRMId) THEN
		RETURN error(-1, format('you declare lrm(%s) for private(%s) but current lrm is %s (no changes)', iMessageId, iPrivateId, iLRMId));
	END IF;
	
	IF (iMessageId IS NULL) THEN
		
		SELECT COUNT(*) INTO iUnreaded FROM msg_private_hist WHERE (private_id = iPrivateId) AND (user_id != i_user_id);
		
	ELSE
		
		PERFORM message_id FROM msg_private_hist WHERE (private_id = iPrivateId) AND (message_id = iMessageId) AND (user_id != i_user_id);
		IF (NOT FOUND) THEN RETURN error(-1, format('messsage(%s) not found in private(%s) or user(%s) is author', iMessageId, iPrivateId, i_user_id)); END IF;
		SELECT COUNT(*) INTO iUnreaded FROM msg_private_hist WHERE (private_id = iPrivateId) AND (user_id != i_user_id) AND (message_id > iMessageId);
		
	END IF;
	
	tsNow := utils__now_utc();
	
	IF (i_user_id < iUserId) THEN
		UPDATE msg_privates SET
			user1_lrm_id   = iMessageId,
			user1_unreaded = iUnreaded,
			user1_lrm_ts   = tsNow
		WHERE (private_id = iPrivateId);
	ELSE
		UPDATE msg_privates SET
			user2_lrm_id   = iMessageId,
			user2_unreaded = iUnreaded,
			user2_lrm_ts   = tsNow
		WHERE (private_id = iPrivateId);
	END IF;
	
	-- достаем сессии юзера который указыват прочитанные сообщения
	SELECT array_agg(sid) INTO aSids FROM sessions WHERE (user_id = i_user_id);
	--RAISE LOG 'aSids=%', aSids;
	
	IF (aSids IS NOT NULL) AND (coalesce(array_length(aSids, 1), 0) > 0) THEN
		
		-- готовим событие изменения прочитанного сообщения
		jEvent := json_build_object(
			'type',      'msg_private_unreaded',
			'user_id',   iUserId,
			'unreaded',  iUnreaded,
			'lrm_id',    iMessageId
		)::jsonb;
		
		PERFORM sub_event_add(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;

	-- достаем сессии собеседника которым нужно отослать событие о прочитении сообщений его собеседником
	SELECT array_agg(sid) INTO aSids FROM sessions WHERE (user_id = iUserId);
	--RAISE LOG 'aSids=%', aSids;
	
	IF (aSids IS NOT NULL) AND (coalesce(array_length(aSids, 1), 0) > 0) THEN
		
		-- готовим событие изменения прочитанного сообщения
		jEvent := json_build_object(
			'type',                 'msg_private_interlocutor_lrm',
			'user_id',              i_user_id,
			'interlocutor_lrm_id',  iMessageId,
      'interlocutor_lrm_ts',  utils__ts2int(tsNow)
		)::jsonb;
		
		PERFORM sub_event_add(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;
	
	RETURN json_build_object(
		'user_id',    iUserId,
		'unreaded',   iUnreaded,
		'lrm_id',     iMessageId,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'msg_private_readed failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.msg_private_readed(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: msg_private_send(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION msg_private_send(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	tBody text;
	jMsgAllowChk json;
	iPrivateId bigint;
	t1 timestamp without time zone;
	t2 timestamp without time zone;
	
	iMessageId bigint;
	
	aSids text[];
	jEvent jsonb;
	__events__ json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	eStack text;
	
BEGIN
	
	--RAISE LOG 'msg_private_send %', i_user_id;
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iUserId := utils__text2bigint(cm->>'user_id');  -- user_id собеседника
	tBody := cm->>'body';  -- текст сообщения
	IF (iUserId IS NULL) THEN RETURN error(-1, 'user_id required'); END IF;
	IF (tBody IS NULL) THEN RETURN error(-1, 'body required'); END IF;
	IF (i_user_id = iUserId) THEN RETURN error(-1, 'user_id must be other user'); END IF;
	
	-- проверяем настройки приватности получаеля сообщения
	SELECT utils__msg_private_allow_check(i_user_id, iUserId) INTO jMsgAllowChk;
	IF (jMsgAllowChk IS NULL) THEN
		RETURN error(-1, format('msg private privacy check failed from(%s) to(%s)', i_user_id, iUserId));
	ELSE
		IF ((jMsgAllowChk->>'err') IS NOT NULL) THEN RETURN jMsgAllowChk; END IF;
		IF ((jMsgAllowChk->>'allowed') != 'true') THEN RETURN error(-1, format('msg private privacy check failed from(%s) to(%s)', i_user_id, iUserId)); END IF;
	END IF;
	
	-- достаем данные привата
	IF (i_user_id < iUserId) THEN
		SELECT private_id INTO iPrivateId FROM msg_privates WHERE (user1_id = i_user_id) AND (user2_id = iUserId);
	ELSE
		SELECT private_id INTO iPrivateId FROM msg_privates WHERE (user1_id = iUserId) AND (user2_id = i_user_id);
	END IF;
	
	-- привата еще не было
	IF (iPrivateId IS NULL) THEN
		BEGIN
			-- создаем приват
			IF (i_user_id < iUserId) THEN
				INSERT INTO msg_privates (user1_id, user2_id) VALUES (i_user_id, iUserId);
			ELSE
				INSERT INTO msg_privates (user1_id, user2_id) VALUES (iUserId, i_user_id);
			END IF;
		EXCEPTION
			WHEN others THEN
				RAISE LOG 'insert into msg_privates failed: %', SQLSTATE;
				RETURN error(-1, 'new private creaing failed');
		END;
		iPrivateId := lastval();
	END IF;
	
	--RAISE LOG 'iPrivateId=%', iPrivateId;
	
	-- обновляем счетчик непрочитанных сообщений
	IF (i_user_id < iUserId) THEN
		UPDATE msg_privates SET user2_unreaded = user2_unreaded + 1 WHERE (private_id = iPrivateId);
	ELSE
		UPDATE msg_privates SET user1_unreaded = user1_unreaded + 1 WHERE (private_id = iPrivateId);
	END IF;
	
	-- добавляем сообщение в историю
	INSERT INTO msg_private_hist (private_id, user_id, message_body) VALUES (iPrivateId, i_user_id, tBody);
	iMessageId := lastval();
	
	-- достаем сессии участинков привата
	SELECT array_agg(sid) INTO aSids FROM sessions WHERE (user_id = iUserId) OR (user_id = i_user_id);
	--RAISE LOG 'aSids=%', aSids;
	
	IF (aSids IS NOT NULL) AND (array_length(aSids, 1) > 0) THEN
		
		-- готовим событие сообщения
		SELECT json_build_object(
			'type',       'msg_private_new',
			'id',         iMessageId,
			'ts',         utils__ts2int(utils__now_utc()),
			'user_id',    users.id,
			'first_name', users.first_name,
			'last_name',  users.last_name,
			'comp_id',    users.comp_id,
			'comp_name',  comps.name,
			'to_user_id', iUserId,
			'body',       tBody
		)
		FROM users
		INTO jEvent
		LEFT JOIN comps ON (comps.id = users.comp_id)
		WHERE (users.id = i_user_id);
		
		PERFORM sub_event_add(aSids, jEvent);
		__events__ := __events__ || json_build_object('sids', aSids, 'event', jEvent);
		
	END IF;
	
	RETURN json_build_object(
		'message_id', iMessageId,
		'__events__', __events__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'msg_private_hist failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.msg_private_send(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: perm_test(bigint, bigint, text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION perm_test(i_user_id bigint, i_comp_id bigint, t_perm_alias text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
	
	--RAISE LOG 'perm_test % % %', i_user_id, i_comp_id, t_perm_alias;
	
	PERFORM * FROM perms WHERE
		(user_id = i_user_id) AND
		(comp_id = i_comp_id) AND
		(
			(perm_type = get_perm(t_perm_alias)) OR
			(perm_type = get_perm('unlimited'))
		);
	
	--RAISE LOG 'perm_found=%', FOUND;
	
	RETURN FOUND;
END;
$$;


ALTER FUNCTION public.perm_test(i_user_id bigint, i_comp_id bigint, t_perm_alias text) OWNER TO cargochat_u;

--
-- Name: perms_get(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION perms_get(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	iUserId bigint;
	iCompId bigint;
	aTmp json[];
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId := utils__text2int(cm->>'comp_id');
	iUserId := utils__text2int(cm->>'user_id');
	IF (iCompId IS NULL) OR (iUserId IS NULL) THEN RETURN error(-2000, 'invalid params'); END IF;
	
	IF (perm_test(i_user_id, iCompId, 'comp_user_perms_manage') IS NOT TRUE) THEN RETURN error(-1, 'no perms'); END IF;
	
	SELECT array_agg(perm_type) INTO aTmp FROM perms WHERE (user_id = iUserId) AND (comp_id = iCompId);
	IF (aTmp IS NULL) THEN aTmp := ARRAY[]::int[]; END IF;
	
	RETURN json_build_object('perms', array_to_json(aTmp));
	
END;
$$;


ALTER FUNCTION public.perms_get(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: perms_set(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION perms_set(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	jPerm json;
	iPerm bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId := utils__text2int(cm->>'comp_id');
	iUserId := utils__text2int(cm->>'user_id');
	IF (iCompId IS NULL) OR (iUserId IS NULL) THEN RETURN error(-2000, 'invalid params'); END IF;
	
	IF
	NOT (
		(perm_test(i_user_id, iCompId, 'comp_user_perms_manage') IS TRUE)
			OR
		(user_perm_test(i_user_id, 'unlimited') IS TRUE)
	)
	THEN RETURN error(-1, 'no perms'); END IF;
	
	DELETE FROM perms WHERE (comp_id = iCompId) AND (user_id = iUserId);
	FOR jPerm IN (
		SELECT * FROM json_array_elements((cm->>'perms')::json)
	) LOOP
		iPerm := utils__text2int(jPerm::text);
		RAISE LOG 'jPerm=% iPerm=%', jPerm::text, iPerm;
		IF (iPerm IS NOT NULL) THEN
			INSERT INTO perms (comp_id, user_id, perm_type) VALUES (iCompId, iUserId, iPerm);
		END IF;
	END LOOP;
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'perms_set failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		IF (eTable = 'perms') AND (SQLSTATE = '23503') THEN  -- foreign_key_violation
			CASE eConstraint
				WHEN 'perms_comp_id_fkey' THEN RETURN error(-2, 'invalid comp');
				WHEN 'perms_user_id_fkey' THEN RETURN error(-3, 'invalid user');
				WHEN 'perms_perm_type_fkey' THEN RETURN error(-4, 'invalid perms');
			ELSE END CASE;
		END IF;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.perms_set(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: sms(json, text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION sms(cm json, t_ipaddr text) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	tSecret text;
	aUsers json[];
	aComps json[];
	aLogins json[];
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'sms % %', cm, t_ipaddr;
	
	tSecret := cm->>'secret';
	IF tSecret IS NULL OR tSecret != 'kriblekrablebooms' THEN RETURN error(-1, 'not for you'); END IF;
	
	SELECT COALESCE(ARRAY_AGG(json_build_object(
		'phone', "foo"."phone",
		'smscode', "foo"."smscode"
	)), ARRAY[]::json[])
	INTO aUsers
	FROM (
		SELECT "phone", "smscode"
		FROM "user"."invites"
		WHERE "smscode" IS NOT NULL
		ORDER BY "ctime"
	) "foo";
	
	SELECT COALESCE(ARRAY_AGG(json_build_object(
		'phone', "foo"."phone",
		'smscode', "foo"."smscode"
	)), ARRAY[]::json[])
	INTO aComps
	FROM (
		SELECT "phone", "smscode"
		FROM "comp"."invites"
		WHERE "smscode" IS NOT NULL
		ORDER BY "ctime"
	) "foo";
	
	SELECT COALESCE(ARRAY_AGG(json_build_object(
		'user_id', "foo"."id",
		'email', "foo"."email",
		'phone', "foo"."mobile",
		'smscode', "foo"."smscode"
	)), ARRAY[]::json[])
	INTO aLogins
	FROM (
		SELECT "id", "email", "mobile", "smscode"
		FROM "public"."users"
		WHERE "smscode" IS NOT NULL
	) "foo";
	
	RETURN json_build_object(
		'user_invites', aUsers,
		'comp_invites', aComps,
		'user_logins', aLogins
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'main.sms: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));	
END;
$$;


ALTER FUNCTION public.sms(cm json, t_ipaddr text) OWNER TO cargochat_u;

--
-- Name: social_auth(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION social_auth(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tProvider text;
	tProvFacebook text = 'facebook';
	tProvLinkedin text = 'linkedin';
	tUserId text;
	--tUserEmail text;
	tUserToken text;
	iUserId bigint;
	sid_ttl interval;
	tSid text;
	tRes text;
	
	eTable text;
	eCol text;
	eDetail text;
	
BEGIN
	
	--RAISE LOG 'social_auth cm=%', cm;
	
	tProvider := cm->>'provider';
	--RAISE LOG 'tProvider=%', tProvider;
	IF (tProvider IS NULL) THEN RETURN error(-1, 'provider required'); END IF;
	
	CASE tProvider
		WHEN tProvFacebook THEN
			
			tUserId := cm#>>'{data,id}';
			--tUserEmail := cm#>>'{data,email}';
			tUserToken := cm->>'access_token';
			--RAISE LOG 'tUserId=% tUserEmail=% tUserToken=%', tUserId, tUserEmail, tUserToken;
			IF (tUserId IS NULL)    THEN RETURN error(-1, 'invalid id');    END IF;
			--IF (tUserEmail IS NULL) THEN RETURN error(-1, 'invalid email'); END IF;
			IF (tUserToken IS NULL) THEN RETURN error(-1, 'invalid token'); END IF;
			
			SELECT user_id INTO iUserId FROM users_auths WHERE ("type" = tProvider) AND ("key" = tUserId);
			--RAISE LOG 'FOUND %', FOUND;
			
			IF (NOT FOUND) THEN RETURN error(-1, format('facebook account(%s) not assigned', tUserId)); END IF;
			UPDATE users_auths SET "secret" = tUserToken, j_doc = (cm->'data')::jsonb WHERE ("type" = tProvider) AND (user_id = iUserId);
			
			--IF (FOUND) THEN
			--	UPDATE users_auths SET "secret" = tUserToken, j_doc = (cm->'data')::jsonb WHERE ("type" = tProvider) AND (user_id = iUserId);
			--ELSE
			--	SELECT id INTO iUserId FROM users WHERE (email = tUserEmail);
			--	IF (NOT FOUND) THEN
			--		INSERT INTO users (first_name, last_name, email) VALUES (cm#>>'{data,first_name}', cm#>>'{data,last_name}', tUserEmail);
			--		iUserId := lastval();
			--	END IF;
			--	INSERT INTO users_auths (user_id, "type", "key", "secret", j_doc) VALUES (iUserId, tProvider, tUserId, tUserToken, (cm->'data')::jsonb);
			--END IF;
			
			--RAISE LOG 'iUserId=%', iUserId;
		WHEN tProvLinkedin THEN
			
			tUserId := cm#>>'{data,id}';
			--tUserEmail := cm#>>'{data,emailAddress}';
			tUserToken := cm->>'access_token';
			--RAISE LOG 'tUserId=% tUserEmail=% tUserToken=%', tUserId, tUserEmail, tUserToken;
			IF (tUserId IS NULL) THEN RETURN error(-1, 'invalid id'); END IF;
			--IF (tUserEmail IS NULL) THEN RETURN error(-1, 'invalid email'); END IF;
			IF (tUserToken IS NULL) THEN RETURN error(-1, 'invalid token'); END IF;
			
			SELECT user_id INTO iUserId FROM users_auths WHERE ("type" = tProvider) AND ("key" = tUserId);
			--RAISE LOG 'FOUND %', FOUND;
			
			IF (NOT FOUND) THEN RETURN error(-1, format('linkedin account(%s) not assigned', tUserId)); END IF;
			UPDATE users_auths SET "secret" = tUserToken, j_doc = (cm->'data')::jsonb WHERE ("type" = tProvider) AND (user_id = iUserId);
			
			--IF (FOUND) THEN
			--	UPDATE users_auths SET "secret" = tUserToken, j_doc = (cm->'data')::jsonb WHERE ("type" = tProvider) AND (user_id = iUserId);
			--ELSE
			--	SELECT id INTO iUserId FROM users WHERE (email = tUserEmail);
			--	IF (NOT FOUND) THEN
			--		INSERT INTO users (first_name, last_name, email VALUES (cm#>>'{data,firstName}', cm#>>'{data,lastName}', tUserEmail);
			--		iUserId := lastval();
			--	END IF;
			--	INSERT INTO users_auths (user_id, "type", "key", "secret", j_doc) VALUES (iUserId, tProvider, tUserId, tUserToken, (cm->'data')::jsonb);
			--END IF;
			
			--RAISE LOG 'iUserId=%', iUserId;
	ELSE
		RETURN error(-1, 'unhandled provider');
	END CASE;
	
	IF (iUserId IS NULL) THEN RETURN error(-1, 'user not found'); END IF;
	
	BEGIN
		sid_ttl := get_const('sid_ttl_interval')::interval;
	EXCEPTION WHEN others THEN
		--RAISE LOG 'invalid const sid_ttl_interval';
		sid_ttl := '1 days'::interval;
	END;
	
	--LOCK TABLE sessions IN EXCLUSIVE MODE;
	
	tSid := generate_sid();
	IF (tSid IS NULL) THEN RETURN error(-2000, 'sidgen failed'); END IF;
	
	UPDATE sessions SET user_id = iUserId WHERE (sid = tSid);
	UPDATE users SET login_ts = utils__now_utc() WHERE (id = iUserId);
	
	RETURN json_build_object('sid', tSid, 'user_id', iUserId);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'social_auth failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		IF (eTable = 'users') AND (eCol = 'email') AND (SQLSTATE = '23502') THEN  -- not_null_violation
			RETURN error(-2, 'invalid email');
		END IF;
		RETURN error(-1, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.social_auth(cm json) OWNER TO cargochat_u;

--
-- Name: social_bind(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION social_bind(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tSid text;
	iUserId bigint;
	tProvider text;
	tProvFacebook text = 'facebook';
	tProvLinkedin text = 'linkedin';
	tUserId text;
	tUserToken text;
	
	eTable text;
	eCol text;
	eDetail text;
	
BEGIN
	
	--RAISE LOG 'social_bind cm=%', cm;
	
	tSid := cm->>'sid';
	IF (tSid IS NULL) THEN RETURN error(-1011, 'sid required'); END IF;
	
	SELECT user_id INTO iUserId FROM sessions WHERE (sid = tSid);
	IF (NOT FOUND) THEN RETURN error(-1011, format('invalid sid(%s)', tSid)); END IF;
	
	tProvider := cm->>'provider';
	--RAISE LOG 'tProvider=%', tProvider;
	IF (tProvider IS NULL) THEN RETURN error(-1, 'provider required'); END IF;
	
	CASE tProvider
		WHEN tProvFacebook THEN
			
			tUserId := cm#>>'{data,id}';
			tUserToken := cm->>'access_token';
			--RAISE LOG 'tUserId=% tUserToken=%', tUserId, tUserToken;
			IF (tUserId IS NULL)    THEN RETURN error(-1, 'invalid id');    END IF;
			IF (tUserToken IS NULL) THEN RETURN error(-1, 'invalid access_token'); END IF;
			
			INSERT INTO users_auths (user_id, "type", "key", "secret", j_doc) VALUES (iUserId, tProvider, tUserId, tUserToken, (cm->'data')::jsonb);
			
		WHEN tProvLinkedin THEN
			
			tUserId := cm#>>'{data,id}';
			tUserToken := cm->>'access_token';
			--RAISE LOG 'tUserId=% tUserToken=%', tUserId, tUserToken;
			IF (tUserId IS NULL)    THEN RETURN error(-1, 'invalid id'); END IF;
			IF (tUserToken IS NULL) THEN RETURN error(-1, 'invalid access_token'); END IF;
			
			INSERT INTO users_auths (user_id, "type", "key", "secret", j_doc) VALUES (iUserId, tProvider, tUserId, tUserToken, (cm->'data')::jsonb);
			
	ELSE
		RETURN error(-1, format('unhandled provider(%s)', tProvider));
	END CASE;
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'social_bind failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		--IF (eTable = 'users') AND (eCol = 'email') AND (SQLSTATE = '23502') THEN RETURN error(-2, 'invalid email'); END IF;  -- not_null_violation
		IF (SQLSTATE = '23505') THEN RETURN error(-2, 'already exists'); END IF;  -- unique constraint
		RETURN error(-1, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.social_bind(cm json) OWNER TO cargochat_u;

--
-- Name: social_facebook_unbind(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION social_facebook_unbind(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	DELETE FROM users_auths WHERE (user_id = i_user_id) AND ("type" = 'facebook');
	IF (NOT FOUND) THEN RETURN error(-1, 'facebook account not binded'); END IF;
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'social_facebook_unbind failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.social_facebook_unbind(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: social_linkedin_unbind(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION social_linkedin_unbind(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	DELETE FROM users_auths WHERE (user_id = i_user_id) AND ("type" = 'linkedin');
	IF (NOT FOUND) THEN RETURN error(-1, 'linkedin account not binded'); END IF;
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'social_linkedin_unbind failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.social_linkedin_unbind(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: sub_comp_invite_create(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION sub_comp_invite_create(opt json) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	iCompId bigint;
	tLastName text;
	tFirstName text;
	tPatName text;
	tEmail text;
	tPhone text;
	tToken text;
	iInviteId bigint;
	
	eHint text;
	eTable text;
	eCol text;
	eDetail text;
	
BEGIN
	
	RAISE LOG 'sub_comp_invite_create %', opt;
	
	iCompId = utils__text2int(opt->>'comp_id');
	tLastName = opt->>'last_name';
	tFirstName = opt->>'first_name';
	tPatName = opt->>'pat_name';
	tEmail = opt->>'email';
	tPhone = opt->>'phone';
	
	IF iCompId IS NULL THEN                        RETURN error(-1, 'comp_id required');    END IF;
	IF tLastName IS NULL THEN                      RETURN error(-4, 'last_name required');  END IF;
	IF tFirstname IS NULL THEN                     RETURN error(-4, 'first_name required'); END IF;
	IF tPatName IS NULL THEN                       RETURN error(-4, 'pat_name required');   END IF;
	IF tEmail IS NULL  THEN                        RETURN error(-5, 'email required');      END IF;
	IF utils__email_test(tEmail) IS NOT TRUE THEN  RETURN error(-5, 'invalid email');       END IF;
	IF tPhone IS NULL  THEN                        RETURN error(-6, 'phone required');      END IF;
	
	PERFORM * FROM "users" WHERE "email" = tEmail;
	IF FOUND THEN                                  RETURN error(-7, 'email used');          END IF;
	
	FOR i IN 1..10 LOOP
		tToken := md5(get_const('salt_key') || random()::text);
		BEGIN
			INSERT INTO "comp"."invites" (
				"comp_id", "token", "last_name", "first_name", "pat_name", "email", "phone"
			) VALUES (
				 iCompId,   tToken,  tLastName,   tFirstName,   tPatName,   tEmail,  tPhone
			);
		EXCEPTION
			WHEN unique_violation THEN tToken := NULL;
			WHEN raise_exception THEN
				GET STACKED DIAGNOSTICS eHint = PG_EXCEPTION_HINT;
				--RAISE LOG 'raise_exception: hint=%', eHint;
				RETURN error(-3, format('comp_invite insert failed: %s', eHint));
			WHEN OTHERS THEN RETURN error(-2000, format('comp_invite insert failed: %s', SQLSTATE));
		END;
		EXIT WHEN tToken IS NOT NULL;
	END LOOP;
	iInviteId := lastval();
	
	RAISE LOG 'sub_comp_invite_create result: iInviteId=% token=%', iInviteId, tToken;
	
	RETURN json_build_object(
		'invite_id', iInviteId,
		'token', tToken
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'sub_comp_invite_create failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.sub_comp_invite_create(opt json) OWNER TO cargochat_u;

--
-- Name: sub_comp_recalc_carriers(bigint); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION sub_comp_recalc_carriers(bigint) RETURNS void
    LANGUAGE sql
    AS $_$
UPDATE "public"."comps" SET "cnt_carriers" = (SELECT COUNT(*) FROM "comp_relations" WHERE "relation_type" = 'transport'::"comp"."tp_comp_relation_type" AND "comp_to" = $1) WHERE "id" = $1;
$_$;


ALTER FUNCTION public.sub_comp_recalc_carriers(bigint) OWNER TO cargochat_u;

--
-- Name: sub_comp_recalc_customers(bigint); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION sub_comp_recalc_customers(bigint) RETURNS void
    LANGUAGE sql
    AS $_$
UPDATE "public"."comps" SET "cnt_customers" = (SELECT COUNT(*) FROM "comp_relations" WHERE "relation_type" = 'transport'::"comp"."tp_comp_relation_type" AND "comp_from" = $1) WHERE "id" = $1;
$_$;


ALTER FUNCTION public.sub_comp_recalc_customers(bigint) OWNER TO cargochat_u;

--
-- Name: sub_comp_recalc_vehicles(bigint); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION sub_comp_recalc_vehicles(i_comp_id bigint) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCount bigint;
	iTag bigint;
	
BEGIN
	
	SELECT count("id") INTO iCount FROM "vehicle"."vehicles_head" WHERE "comp_id" = i_comp_id AND "type" = ANY(ARRAY['truck', 'lorry']);
	
	UPDATE "comps" SET "cnt_vehicles" = iCount WHERE "id" = i_comp_id;
	
	SELECT "comp_tag_id" INTO iTag FROM "comp_tags" WHERE "comp_id" = i_comp_id AND "tag" = 'carrier'::"comp"."tp_comp_tag";
	IF iTag IS NULL THEN
		IF iCount > 0 THEN
			BEGIN
				INSERT INTO "comp_tags" ("comp_id", "tag") VALUES (i_comp_id, 'carrier'::"comp"."tp_comp_tag");
			EXCEPTION
				WHEN OTHERS THEN NULL;
			END;
		END IF;
	ELSE
		IF iCount < 1 THEN
			DELETE FROM "comp_tags" WHERE "comp_tag_id" = iTag;
		END IF;
	END IF;
	
END;
$$;


ALTER FUNCTION public.sub_comp_recalc_vehicles(i_comp_id bigint) OWNER TO cargochat_u;

--
-- Name: sub_event_add(text[], jsonb); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION sub_event_add(a_sids text[], j_event jsonb) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	jEventDocId bigint;
	tSid text;
	
	eTable text;
	eCol text;
	eDetail text;
	
BEGIN
	
	--RAISE LOG 'sub_event_add a_sids=% j_event=%', a_sids, j_event;
	
	INSERT INTO event_docs ("type", "doc") VALUES (j_event->>'type', j_event);
	jEventDocId := lastval();
	--RAISE LOG 'jEventDocId=%', jEventDocId;
	
	-- рассылаем событие
	FOREACH tSid IN ARRAY a_sids LOOP
		--RAISE LOG 'tSid=%', tSid;
		INSERT INTO events (sid, event_doc_id) VALUES (tSid, jEventDocId);
	END LOOP;
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'sub_event_add failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.sub_event_add(a_sids text[], j_event jsonb) OWNER TO cargochat_u;

--
-- Name: temp_file_create(bigint, bigint, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION temp_file_create(i_sid_id bigint, i_user_id bigint, cm json) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	iFileSize bigint;
	iFileName text;
	iTotalSize bigint;
	iFileId bigint;
	tFileToken text;
	
	iMaxFileSize bigint = 1024 * 1024 * 10;
	iMaxTotalSize bigint = 1024 * 1024 * 50;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	iFileSize := utils__text2bigint(cm->>'size');
	iFileName := cm->>'name';
	IF (iFileSize IS NULL) THEN RETURN error(-1, 'size required'); END IF;
	IF (iFileName IS NULL) THEN RETURN error(-1, 'name required'); END IF;
	IF (iFileSize < 0) THEN RETURN error(-1, 'invalid size'); END IF;
	--RAISE LOG 'iFileSize=%', iFileSize;
	IF (iFileSize > iMaxFileSize) THEN RETURN error(-1, format('file size(%s) limit(%s)', iFileSize, iMaxFileSize)); END IF;
	
	SELECT SUM("size") INTO iTotalSize FROM files WHERE user_id = i_user_id AND temporary AND NOT deleted;
	--RAISE LOG 'iTotalSize=%', iTotalSize;
	IF (iTotalSize + iFileSize > iMaxTotalSize) THEN RETURN error(-1, format('file size(%s) disk space used(%s) limit(%s)', iFileSize, iTotalSize, iMaxTotalSize)); END IF;
	
	INSERT INTO files (user_id, temporary, "size", "name")
	VALUES (i_user_id, TRUE, iFileSize, iFileName)
	RETURNING id, token
	INTO iFileId, tFileToken;
	--iFileId := lastval();
	RAISE LOG 'iFileId=% tFileToken=%', iFileId, tFileToken;
	
	RETURN json_build_object(
		'id', iFileId,
		'token', tFileToken
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'fs_temp_file_create failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.temp_file_create(i_sid_id bigint, i_user_id bigint, cm json) OWNER TO cargochat_u;

--
-- Name: tender_create(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_create(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	iTendId bigint;
	tsStart timestamp without time zone;
	tsEnd timestamp without time zone;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	RETURN error(-1, 'tender_create temporary blocked');
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId := utils__text2int(cm->>'comp_id');
	IF (iCompId IS NULL) THEN RETURN error(-1010, 'invalid comp_id'); END IF;
	RAISE LOG 'iCompId=%', iCompId;
	
	PERFORM * FROM comps WHERE (id = iCompId);
	IF (NOT FOUND) THEN RETURN error(-1, 'comp not found'); END IF;
	
	--IF (perm_test(i_user_id, iCompId, 'comp_tender_manage') IS NOT TRUE) THEN RETURN error(-2, 'no perms'); END IF;
	IF (comp_user_perm_test(i_user_id, iCompId, const.user_comp_perm__tenders_manager()) IS NOT TRUE) THEN RETURN error(-2, 'no perms'); END IF;
	
	tsStart := utils__text2ts(cm->>'stime');
	IF (tsStart IS NULL) THEN RETURN error(-1010, 'invalid stime'); END IF;
	
	tsEnd := utils__text2ts(cm->>'etime');
	IF (tsEnd IS NULL) THEN RETURN error(-1010, 'invalid etime'); END IF;
	
	INSERT INTO tenders (name, owner_comp_id, ctime, stime, etime, organizer, requests, j_doc)
	VALUES (cm->>'name', iCompId, utils__now_utc(), tsStart, tsEnd, cm->>'organizer', cm->>'requests', (cm->'j_doc')::jsonb);
	iTendId := lastval();
	RAISE LOG 'iTendId=%', iTendId;
	
	--INSERT INTO rt_comp_tender (comp_id, tender_id) VALUES (iCompId, iTendId);
	
	RETURN json_build_object('tender_id', iTendId);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'tender_create failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_create(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_delete(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_delete(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iTendId bigint;
	iCompId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iTendId := utils__text2bigint(cm->>'tender_id');
	IF (iTendId IS NULL) THEN RETURN error(-1010, 'invalid tender_id'); END IF;
	RAISE LOG 'iTendId=%', iTendId;
	
	SELECT owner_comp_id FROM tenders INTO iCompId WHERE (id = iTendId);
	IF (iCompId IS NULL) THEN RETURN error(-1, 'tender not found'); END IF;
	RAISE LOG 'iCompId=%', iCompId;
	
	--IF (perm_test(i_user_id, iCompId, 'comp_tender_manage') IS NOT TRUE) THEN RETURN error(-2, 'no perms'); END IF;
	IF (comp_user_perm_test(i_user_id, iCompId, const.user_comp_perm__tenders_manager()) IS NOT TRUE) THEN RETURN error(-2, 'no perms'); END IF;
	
	DELETE FROM tenders WHERE (id = iTendId);
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'tender_delete failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_delete(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_invite_accept(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_invite_accept(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	aInvites text[];
	oInvite record;
	aAccepted bigint[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	aInvites := utils__json2array(cm->'invites');
	IF (aInvites IS NULL) THEN RETURN error(-2000, 'invalid invites'); END IF;
	
	aAccepted := ARRAY[]::bigint[];
	FOR oInvite IN
		SELECT id, tender_id, comp_id, state
		FROM tender_invites
		WHERE (id::text = ANY(aInvites)) AND (state = 0)
	LOOP
		--RAISE LOG 'oInvite=%', oInvite;
		--CONTINUE WHEN (perm_test(i_user_id, oInvite.comp_id, 'comp_tender_manage') IS NOT TRUE);
		CONTINUE WHEN (comp_user_perm_test(i_user_id, oInvite.comp_id, const.user_comp_perm__tenders_manager()) IS NOT TRUE);
		BEGIN
			INSERT INTO rt_comp_tender (comp_id, tender_id) VALUES (oInvite.comp_id, oInvite.tender_id);
			aAccepted := aAccepted || oInvite.id;
		EXCEPTION
			WHEN unique_violation THEN
				aAccepted := aAccepted || oInvite.id;  -- comp already linked with tender, its okay
			WHEN others THEN
				RAISE LOG 'tender_invite_accept rt_comp_tender insertion failed: SQLSTATE=% SQLERRM="%"', SQLSTATE, SQLERRM;
		END;
	END LOOP;
	IF (array_length(aAccepted, 1) > 0) THEN
		UPDATE tender_invites SET state = 1 WHERE (id = ANY(aAccepted));
	END IF;
	
	RETURN json_build_object('invites_accepted', aAccepted);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'tender_invite_accept failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_invite_accept(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_invite_create(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_invite_create(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	iTendId bigint;
	aComps text[];
	tCompId text;
	iCompId bigint;
	aInvites json[];
	eTable text;
	eCol text;
	eDetail text;
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iTendId = utils__text2bigint(cm->>'tender_id');
	IF (iTendId IS NULL) THEN RETURN error(-2000, 'invalid tender_id'); END IF;
	
	aComps := utils__json2array(cm->'comps');
	IF (aComps IS NULL) THEN RETURN error(-2000, 'invalid comps'); END IF;
	
	SELECT owner_comp_id FROM tenders INTO iCompId WHERE (id = iTendId);
	IF (iCompId IS NULL) THEN RETURN error(-1, 'tender not found'); END IF;
	--RAISE LOG 'iCompId=%', iCompId;
	
	--IF (perm_test(i_user_id, iCompId, 'comp_tender_manage') IS NOT TRUE) THEN RETURN error(-2, 'perm "comp_tender_manage" required'); END IF;
	IF (comp_user_perm_test(i_user_id, iCompId, const.user_comp_perm__tenders_manager()) IS NOT TRUE) THEN RETURN error(-2, 'perm "comp_tender_manage" required'); END IF;
	
	aInvites := ARRAY[]::json[];
	FOREACH tCompId IN ARRAY aComps LOOP
		iCompId := utils__text2bigint(tCompId);
		CONTINUE WHEN (iCompId IS NULL);
		--RAISE LOG 'invited iCompId=%', iCompId;
		BEGIN
			INSERT INTO tender_invites (tender_id, comp_id, state) VALUES (iTendId, iCompId, 0);
			-- todo: make trigger for aborting invite if comp_id already have tender_id
			aInvites := aInvites || json_build_object('id', lastval(), 'comp_id', iCompId);
		EXCEPTION
			WHEN others THEN
				GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
				RAISE LOG 'tender_invite_create tender_invites insertion failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		END;
	END LOOP;
	
	RETURN json_build_object('invites_created', array_to_json(aInvites));
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'tender_invite_create failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_invite_create(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_invite_delete(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_invite_delete(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	aInvites text[];
	oInvite record;
	aDeleted bigint[];
	eTable text;
	eCol text;
	eDetail text;
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	aInvites := utils__json2array(cm->'invites');
	IF (aInvites IS NULL) THEN RETURN error(-2000, 'invalid invites'); END IF;
	
--	FOREACH tInviteId IN ARRAY aInvites LOOP
--		iInviteId := utils__text2int(tInviteId);
--		CONTINUE WHEN (iInviteId IS NULL);
--		RAISE LOG 'iInviteId=%', iInviteId;
--	END LOOP;
	
	aDeleted := ARRAY[]::bigint[];
	FOR oInvite IN
		SELECT
			tender_invites.id,
			tender_invites.tender_id,
			tender_invites.comp_id,
			tender_invites.state,
			tenders.owner_comp_id owner_comp_id
		FROM tender_invites
		LEFT JOIN tenders ON (tenders.id = tender_invites.tender_id)
		WHERE (tender_invites.id::text = ANY(aInvites))
	LOOP
		--RAISE LOG 'oInvite=%', oInvite;
		--CONTINUE WHEN (perm_test(i_user_id, oInvite.owner_comp_id, 'comp_tender_manage') IS NOT TRUE);
		CONTINUE WHEN (comp_user_perm_test(i_user_id, oInvite.owner_comp_id, const.user_comp_perm__tenders_manager()) IS NOT TRUE);
		aDeleted := aDeleted || oInvite.id;
		DELETE FROM tender_invites WHERE (id = oInvite.id);
	END LOOP;
	
	RETURN json_build_object('invites_deleted', aDeleted);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'tender_invite_delete failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_invite_delete(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_invite_refuse(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_invite_refuse(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	aInvites text[];
	oInvite record;
	aRefused bigint[];
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	aInvites := utils__json2array(cm->'invites');
	IF (aInvites IS NULL) THEN RETURN error(-2000, 'invalid invites'); END IF;
	
	aRefused := ARRAY[]::bigint[];
	FOR oInvite IN
		SELECT id, tender_id, comp_id, state
		FROM tender_invites
		WHERE (id::text = ANY(aInvites)) AND (state = 0)
	LOOP
		--RAISE LOG 'oInvite=%', oInvite;
		--CONTINUE WHEN (perm_test(i_user_id, oInvite.comp_id, 'comp_tender_manage') IS NOT TRUE);
		CONTINUE WHEN (comp_user_perm_test(i_user_id, oInvite.comp_id, const.user_comp_perm__tenders_manager()) IS NOT TRUE);
		aRefused := aRefused || oInvite.id;
	END LOOP;
	IF (array_length(aRefused, 1) > 0) THEN
		UPDATE tender_invites SET state = 2 WHERE (id = ANY(aRefused));
	END IF;
	
	RETURN json_build_object('invites_refused', aRefused);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'tender_invite_refuse failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_invite_refuse(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_join_request_accept(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_join_request_accept(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	aReqs text[];
	oReq record;
	aAccepted bigint[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	aReqs := utils__json2array(cm->'requests');
	IF (aReqs IS NULL) THEN RETURN error(-2000, 'invalid requests'); END IF;
	
	aAccepted := ARRAY[]::bigint[];
	FOR oReq IN
		SELECT
			tender_join_requests.id,
			tender_join_requests.tender_id,
			tender_join_requests.comp_id,
			tender_join_requests.state,
			tenders.owner_comp_id
		FROM tender_join_requests
		LEFT JOIN tenders ON (tenders.id = tender_join_requests.tender_id)
		WHERE (tender_join_requests.id::text = ANY(aReqs)) AND (state = 0)
	LOOP
		--RAISE LOG 'oReq=%', oReq;
		--CONTINUE WHEN (perm_test(i_user_id, oReq.owner_comp_id, 'comp_tender_manage') IS NOT TRUE);
		CONTINUE WHEN (comp_user_perm_test(i_user_id, oReq.owner_comp_id, const.user_comp_perm__tenders_manager()) IS NOT TRUE);
		BEGIN
			INSERT INTO rt_comp_tender (comp_id, tender_id) VALUES (oReq.comp_id, oReq.tender_id);
			aAccepted := aAccepted || oReq.id;
		EXCEPTION
			WHEN unique_violation THEN
				aAccepted := aAccepted || oReq.id;  -- comp already linked with tender, its okay
			WHEN others THEN
				RAISE LOG 'tender_join_request_accept rt_comp_tender insertion failed: SQLSTATE=% SQLERRM="%"', SQLSTATE, SQLERRM;
		END;
	END LOOP;
	IF (array_length(aAccepted, 1) > 0) THEN
		UPDATE tender_join_requests SET state = 1 WHERE (id = ANY(aAccepted));
	END IF;
	
	RETURN json_build_object('tender_join_request_accepted', aAccepted);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'tender_join_request_accept failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_join_request_accept(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_join_request_create(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_join_request_create(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	aTends text[];
	aRequests json[];
	oTend record;
	iRequestId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iCompId = utils__text2bigint(cm->>'comp_id');
	IF (iCompId IS NULL) THEN RETURN error(-2000, 'invalid comp_id'); END IF;
	
	aTends := utils__json2array(cm->'tenders');
	IF (aTends IS NULL) THEN RETURN error(-2000, 'invalid tenders'); END IF;
	
	--IF (perm_test(i_user_id, iCompId, 'comp_tender_manage') IS NOT TRUE) THEN RETURN error(-2, 'perm "comp_tender_manage" required'); END IF;
	IF (comp_user_perm_test(i_user_id, iCompId, const.user_comp_perm__tenders_manager()) IS NOT TRUE) THEN RETURN error(-2, 'perm "comp_tender_manage" required'); END IF;
	
	aRequests := ARRAY[]::json[];
	FOR oTend IN
		SELECT id FROM tenders WHERE (id::text = ANY(aTends)) AND (owner_comp_id != iCompId)
	LOOP
		--RAISE LOG 'oTend=%', oTend;
		iRequestId := -1;
		BEGIN
			INSERT INTO tender_join_requests (tender_id, comp_id, state) VALUES (oTend.id, iCompId, 0);
			-- todo: make trigger for aborting requests if comp_id already have tender_id
			iRequestId := lastval();
		EXCEPTION
			WHEN unique_violation THEN
				-- request already exsist, its okay
			WHEN others THEN
				-- request insertion failed
				RAISE LOG 'tender_join_request_create tender_join_requests insertion failed: SQLSTATE=% SQLERRM="%"', SQLSTATE, SQLERRM;
		END;
		IF (iRequestId != -1) THEN
			aRequests := aRequests || json_build_object('id', lastval(), 'tender_id', oTend.id);
		END IF;
	END LOOP;
	
	RETURN json_build_object('tender_join_requests_created', array_to_json(aRequests));
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'tender_invite_create failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_join_request_create(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_join_request_delete(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_join_request_delete(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	aReqs text[];
	oReq record;
	aDeleted bigint[];
	
	eTable text;
	eCol text;
	eDetail text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	aReqs := utils__json2array(cm->'requests');
	IF (aReqs IS NULL) THEN RETURN error(-2000, 'invalid requests'); END IF;
	
	aDeleted := ARRAY[]::bigint[];
	FOR oReq IN
		SELECT id, comp_id FROM tender_join_requests WHERE (id::text = ANY(aReqs))
	LOOP
		--RAISE LOG 'oReq=%', oReq;
		--CONTINUE WHEN (perm_test(i_user_id, oReq.comp_id, 'comp_tender_manage') IS NOT TRUE);
		CONTINUE WHEN (comp_user_perm_test(i_user_id, oReq.comp_id, const.user_comp_perm__tenders_manager()) IS NOT TRUE);
		aDeleted := aDeleted || oReq.id;
		DELETE FROM tender_join_requests WHERE (id = oReq.id);
	END LOOP;
	
	RETURN json_build_object('tender_join_requests_deleted', array_to_json(aDeleted));
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL;
		RAISE LOG 'tender_join_request_delete failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_join_request_delete(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_join_request_refuse(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_join_request_refuse(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	aReqs text[];
	oReq record;
	aRefused bigint[];
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	aReqs := utils__json2array(cm->'requests');
	IF (aReqs IS NULL) THEN RETURN error(-2000, 'invalid requests'); END IF;
	
	aRefused := ARRAY[]::bigint[];
	FOR oReq IN
		SELECT
			tender_join_requests.id,
			tender_join_requests.tender_id,
			tender_join_requests.comp_id,
			tender_join_requests.state,
			tenders.owner_comp_id
		FROM tender_join_requests
		LEFT JOIN tenders ON (tenders.id = tender_join_requests.tender_id)
		WHERE (tender_join_requests.id::text = ANY(aReqs)) AND (state = 0)
	LOOP
		--RAISE LOG 'oReq=%', oReq;
		--CONTINUE WHEN (perm_test(i_user_id, oReq.owner_comp_id, 'comp_tender_manage') IS NOT TRUE);
		CONTINUE WHEN (comp_user_perm_test(i_user_id, oReq.owner_comp_id, const.user_comp_perm__tenders_manager()) IS NOT TRUE);
		aRefused := aRefused || oReq.id;
	END LOOP;
	IF (array_length(aRefused, 1) > 0) THEN
		UPDATE tender_join_requests SET state = 2 WHERE (id = ANY(aRefused));
	END IF;
	
	RETURN json_build_object('tender_join_request_refused', aRefused);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'tender_join_request_refuse failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_join_request_refuse(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tender_update(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tender_update(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iTendId bigint;
	iCompId bigint;
	aParams text[];
	tSQL text;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iTendId := utils__text2bigint(cm->>'tender_id');
	IF (iTendId IS NULL) THEN RETURN error(-1010, 'tender_id required'); END IF;
	
	SELECT owner_comp_id INTO iCompId FROM tenders WHERE (id = iTendId);
	IF (iCompId IS NULL) THEN RETURN error(-1, format('tender(%s) not found', iTendId)); END IF;
	
	--IF (perm_test(i_user_id, iCompId, 'comp_tender_manage') IS NOT TRUE) THEN
	IF (comp_user_perm_test(i_user_id, iCompId, const.user_comp_perm__tenders_manager()) IS NOT TRUE) THEN
		RETURN error(
			-2,
			format('perm(%s) required: user(%s) comp(%s) tend(%s)', 'comp_tender_manage', i_user_id, iCompId, iTendId)
		);
	END IF;
	
	aParams := "utils"."prepare_update"(
		cm,
		'{
			"name":        {"col": "name",      "type": "text"},
			"stime":       {"col": "stime",     "type": "ts"},
			"etime":       {"col": "etime",     "type": "ts"},
			"organizer":   {"col": "organizer", "type": "text"},
			"requests":    {"col": "requests",  "type": "text"},
			"j_doc":       {"col": "j_doc",     "type": "json"}
		}'
	);
	RAISE LOG 'aParams=%', aParams;
	
	IF (aParams IS NOT NULL) AND (array_length(aParams, 1) > 0) THEN
		tSQL := format('UPDATE tenders SET %s WHERE (id=%s)', array_to_string(aParams, ','), iTendId);
		RAISE LOG 'tSQL: %', tSQL;
		EXECUTE tSQL;
	END IF;
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'tender_update failed: SQLSTATE=% SQLERRM="%" table=% col=% detail="%" eConstraint=%', SQLSTATE, SQLERRM, eTable, eCol, eDetail, eConstraint;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.tender_update(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: tenders_list(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION tenders_list(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":             {"select": "id",                         "type": "number"},
			"owner_comp_id":  {"select": "owner_comp_id",              "type": "number"},
			"name":           {"select": "name",                       "type": "text"},
			"ctime":          {"select": "utils__ts2int(ctime) ctime", "type": "timestamp"},
			"stime":          {"select": "utils__ts2int(stime) stime", "type": "timestamp"},
			"etime":          {"select": "utils__ts2int(etime) etime", "type": "timestamp"},
			"organizer":      {"select": "organizer",                  "type": "text"},
			"requests":       {"select": "requests",                   "type": "text"},
			"j_doc":          {"select": "j_doc",                      "type": "json"}
		}
	}';
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
BEGIN
	
	--RAISE LOG 'tenders_list, time=%s', utils__now_utc();
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	IF (tOrderBy IS NULL) OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN tOrderBy = jCfg->>'default_field'; END IF;
	IF (tDir IS NULL) OR (NOT (tDir = ANY(ARRAY['ASC','DESC']))) THEN tDir := 'ASC'; END IF;
	IF (iOffset IS NULL) THEN iOffset = 0; END IF;
	IF (iLimit IS NULL) THEN iLimit = 50; ELSIF (iLimit < 1) THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := utils__json2array(cm->'fields');
	IF (aFields IS NOT NULL) AND (coalesce(array_length(aFields, 1), 0) > 0) THEN
		FOREACH tField IN ARRAY aFields LOOP
			IF ((jCfg->'fields'->tField) IS NOT NULL) THEN
				aSelection := aSelection || (jCfg->'fields'->tField->>'select');
			END IF;
		END LOOP;
	END IF;
	IF (coalesce(array_length(aSelection, 1), 0) < 1) THEN
		aSelection := aSelection || (jCfg->>'default_field');
	END IF;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF (aFilters IS NOT NULL) THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			--RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			CONTINUE WHEN (json_typeof(jFilter) != 'object');
			
			tCol := jFilter->>'col';
			tVal := jFilter->>'val';
			--RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('%I < %L', tCol, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%I > %L', tCol, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%I = %L', tCol, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('utils__ts2int(%I) < %L', tCol, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('utils__ts2int(%I) > %L', tCol, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('utils__ts2int(%I) = %L', tCol, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%I ~* E%L', tCol, tVal);
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	tQuery := format('CREATE TEMP TABLE t1 ON COMMIT DROP AS SELECT %I __tmp_key__ FROM %I', jCfg->>'default_field', 'tenders');
	IF (coalesce(array_length(aWhere, 1), 0) > 0) THEN tQuery := tQuery || ' WHERE (' || array_to_string(aWhere, ') AND (') || ')'; END IF;
	--RAISE LOG 'tQuery=%', tQuery;
	EXECUTE tQuery;
	
	SELECT count(*) FROM t1 INTO iTotal;
	--RAISE LOG 'iTotal=%', iTotal;
	
	aResult := ARRAY[]::json[];
	IF (iTotal > 0) THEN
		tQuery := format('SELECT %s FROM t1 LEFT JOIN %I ON (t1.__tmp_key__ = %I.%I) ORDER BY %I %s OFFSET %L LIMIT %L', array_to_string(aSelection, ', '), 'tenders', 'tenders', jCfg->>'default_field', tOrderBy, tDir, iOffset, iLimit);
		RAISE LOG 'tQuery=%', tQuery;
		FOR oRec IN EXECUTE tQuery LOOP
			aResult := aResult || row_to_json(oRec);
			--RAISE LOG 'record=%', row_to_json(oRec);
		END LOOP;
	END IF;
	
	RETURN json_build_object('total', iTotal, 'data', array_to_json(aResult));
	
END;
$$;


ALTER FUNCTION public.tenders_list(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: user_auths(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_auths(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	oTmp record;
	aTmp json[];
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	aTmp := ARRAY[]::json[];
	FOR oTmp IN
		(SELECT "type", "key", "secret" FROM users_auths WHERE (user_id = i_user_id))
	LOOP
		aTmp := aTmp || row_to_json(oTmp);
	END LOOP;
	RETURN json_build_object('auths', array_to_json(aTmp));
	
END;
$$;


ALTER FUNCTION public.user_auths(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: user_change_email(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_change_email(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	tKeyB text;
	tPassw text;
	iUserId bigint;
	tNewEmail text;
BEGIN
	
	tKeyB := cm->>'key_b';
	IF (tKeyB IS NULL) THEN RETURN error(-1, 'invalid key'); END IF;
	
	SELECT user_id, j_doc->>'new_email' INTO iUserId, tNewEmail FROM keys WHERE "key" = tKeyB AND state = 'key_b';
	IF (NOT FOUND) THEN RETURN error(-1, 'invalid key'); END IF;
	IF (tNewEmail IS NULL) THEN RETURN error(-2000, 'invalid new_email'); END IF;
	--RAISE LOG 'iUserId=% tNewEmail=%', iUserId, tNewEmail;
	
	DELETE FROM keys WHERE ("key" = tKeyB);
	UPDATE users_auths SET "key" = tNewEmail WHERE (user_id = iUserId) AND ("type" = 'email_passw');
	
	RETURN json_build_object();
	
END;
$$;


ALTER FUNCTION public.user_change_email(cm json) OWNER TO cargochat_u;

--
-- Name: user_contact_add(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_contact_add(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iUserId := utils__text2int(cm->>'user_id');
	IF (iUserId IS NULL) THEN RETURN error(-1, 'user_id required'); END IF;
	
	INSERT INTO "user"."contacts" ("user_id", "contact_user_id") VALUES (i_user_id, iUserId);
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		IF (SQLSTATE = '23503') THEN RETURN error(-1, 'user not found'); END IF;  -- foreign key constraint
		IF (SQLSTATE = '23505') THEN RETURN error(-1, 'already exists'); END IF;  -- unique constraint
		RAISE LOG 'user_contact_add failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.user_contact_add(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: user_contact_rem(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_contact_rem(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	iUserId := utils__text2int(cm->>'user_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'user_id required'); END IF;
	
	DELETE FROM "user"."contacts" WHERE "user_id" = i_user_id AND "contact_user_id" = iUserId;
	IF NOT FOUND THEN RETURN error(-1, 'not found'); END IF;
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'user_contact_rem failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.user_contact_rem(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: user_get_by_sid(json, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_get_by_sid(cl json, cm json) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	iVehicleId bigint;
	
	iSTSRegular bigint;
	iPTSRegular bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'user_get_by_sid % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	
	RETURN json_build_object(
		'user_id', iUserId,
		'comp_id', iCompId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'user_get_by_sid failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%, eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.user_get_by_sid(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: user_get_key_a(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_get_key_a(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tEmail text;
	iUserId bigint;
	tKey text;
	jDoc json;
	
BEGIN
	
	tEmail := cm->>'email';
	IF utils__email_test(tEmail) IS NOT TRUE THEN RETURN error(-1, 'invalid email'); END IF;
	
	SELECT "user_id" INTO iUserId FROM "users_auths" WHERE "type" = 'email_passw' AND LOWER("key") = LOWER(tEmail);
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid email'); END IF;
	--RAISE LOG 'iUserId=%', iUserId;
	
	tKey := generate_key();
	IF tKey IS NULL THEN RETURN error(-2000, 'keygen failed'); END IF;
	
	DELETE FROM "keys" WHERE "user_id" = iUserId AND "state" = 'key_a';
	jDoc := json_build_object('current_email', tEmail);
	UPDATE "keys" SET "user_id" = iUserId, "j_doc" = jDoc::jsonb, "state" = 'key_a' WHERE "key" = tKey;
	
	RETURN json_build_object(
		'key', tKey
	);
	
END;
$$;


ALTER FUNCTION public.user_get_key_a(cm json) OWNER TO cargochat_u;

--
-- Name: user_get_key_b(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_get_key_b(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	tKeyA text;
	tEmail text;
	iUserId bigint;
	tKeyB text;
	jDoc json;
BEGIN
	
	tKeyA := cm->>'key_a';
	tEmail := cm->>'new_email';
	IF ((tKeyA IS NULL) OR (utils__email_test(tEmail) IS NOT TRUE)) THEN RETURN error(-1, 'invalid key_a or new_email'); END IF;
	
	SELECT user_id, j_doc INTO iUserId, jDoc FROM keys WHERE "key" = tKeyA AND state = 'key_a';
	IF (iUserId IS NULL) THEN RETURN error(-1, 'invalid key'); END IF;
	DELETE FROM keys WHERE "key" = tKeyA;
	
	tKeyB := generate_key();
	IF (tKeyB IS NULL) THEN RETURN error(-2000, 'keygen failed'); END IF;
	
	jDoc := json_build_object('new_email', tEmail);
	UPDATE keys SET user_id = iUserId, j_doc = jDoc::jsonb, state = 'key_b' WHERE key = tKeyB;
	
	RETURN json_build_object('key', tKeyB);
	
END;
$$;


ALTER FUNCTION public.user_get_key_b(cm json) OWNER TO cargochat_u;

--
-- Name: user_info(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_info(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	iUsersLen bigint;
	iUserIndex bigint;
	iUserId bigint;
	aUsersIds bigint[];
	oTmp record;
	aTmp json[];
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	BEGIN
		iUsersLen := json_array_length(cm->'users');
	EXCEPTION
		WHEN others THEN iUsersLen := 0;
	END;
	RAISE LOG 'iUsersLen=%', iUsersLen;
	
	IF (iUsersLen IS NULL) OR (iUsersLen < 1) THEN RETURN json_build_object('users', ARRAY[]::json[]); END IF;
	IF (iUsersLen > 500) THEN iUsersLen := 500; END IF;
	
	FOR iUserIndex IN 0..iUsersLen-1 LOOP
		iUserId := utils__text2int(cm->'users'->>iUserIndex);
		IF (iUserId IS NOT NULL) THEN
			--RAISE LOG 'i=% id=%', iUserIndex, iUserId;
			aUsersIds := aUsersIds || iUserId;
		END IF;
	END LOOP;
	--RAISE LOG 'aUsersIds=%', aUsersIds;
	
	aTmp := ARRAY[]::json[];
	FOR oTmp IN
		WITH tt as (SELECT unnest(aUsersIds) rid)
		SELECT id, first_name, last_name, pat_name, birthday, gender, email, icq, users.j_doc
		FROM tt
		LEFT JOIN users ON (users.id = tt.rid)
		WHERE "id" IS NOT NULL
	LOOP
		aTmp := aTmp || row_to_json(oTmp);
	END LOOP;
	
	RETURN json_build_object('users', array_to_json(aTmp));
	
END;
$$;


ALTER FUNCTION public.user_info(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: user_logout(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_logout(i_user_id bigint, t_sid text, cm_json json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	tSid text;
	iUserId bigint;
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	DELETE FROM sessions WHERE sid = t_sid;
	IF (NOT FOUND) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	RETURN json_build_object();
	
END;
$$;


ALTER FUNCTION public.user_logout(i_user_id bigint, t_sid text, cm_json json) OWNER TO cargochat_u;

--
-- Name: user_perm_get(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_perm_get(t_alias text) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
	iType bigint;
BEGIN
	SELECT perm_type INTO iType FROM user_perm_type WHERE (alias = t_alias);
	RETURN iType;
END;
$$;


ALTER FUNCTION public.user_perm_get(t_alias text) OWNER TO cargochat_u;

--
-- Name: user_perm_test(bigint, text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_perm_test(i_user_id bigint, t_perm_alias text) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
BEGIN
	PERFORM * FROM user_perm WHERE
		(user_id = i_user_id) AND
		(
			(perm_type = user_perm_get(t_perm_alias)) OR
			(perm_type = user_perm_get('unlimited'))
		);
	--RAISE LOG 'user_perm_test % % %', i_user_id, t_perm_alias, FOUND;
	RETURN FOUND;
END;
$$;


ALTER FUNCTION public.user_perm_test(i_user_id bigint, t_perm_alias text) OWNER TO cargochat_u;

--
-- Name: user_sessions(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_sessions(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	--oTmp record;
	aTmp json[];
		
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	/*
	aTmp := ARRAY[]::json[];
	FOR oTmp IN
		(SELECT sid, ctime, mtime, ip FROM sessions WHERE (user_id = i_user_id))
	LOOP
		aTmp := aTmp || row_to_json(oTmp);
	END LOOP;
	*/
	SELECT coalesce(array_agg(json_build_object(
		'sid', sid,
		'ctime', utils__ts2int(ctime),
		'mtime', utils__ts2int(mtime),
		'ip', ip
	)), ARRAY[]::json[])
	INTO aTmp
	FROM sessions
	WHERE (user_id = i_user_id);
	
	RETURN json_build_object('sessions', array_to_json(aTmp));
	
END;
$$;


ALTER FUNCTION public.user_sessions(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: user_state(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_state(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	jUser json;
	jComp json;
	aAccounts json[] = ARRAY[]::json[];
	oRec record;
	iMaxEventId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	IF i_user_id IS NULL OR t_sid IS NULL THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	SELECT json_build_object(
		'id',         id,
		'flags',      flags,
    'first_name', first_name,
		'last_name',  last_name,
		'pat_name',   pat_name,
		'birthday',   birthday,
		'gender',     gender,
		'email',      email,
		'comp_id',    comp_id,
		'comp_flags', comp_flags,
		'icq',        icq,
		'mobile',     mobile,
		'skype',      skype,
		'position',   position,
		'workspace',  workspace,
		'j_doc',      j_doc
	) INTO jUser FROM users WHERE (id = i_user_id);
	
	IF NOT FOUND THEN RETURN error(-2000, 'user not found'); END IF;
	
	-- comp
	
	IF ((jUser->>'comp_id') IS NOT NULL) THEN
		SELECT json_build_object(
			'id',   id,
			'inn',  inn,
			'name', name
		) INTO jComp FROM comps WHERE (id = (jUser->>'comp_id')::bigint);
	END IF;
	
	-- version
	
	SELECT max(event_id) INTO iMaxEventId FROM events WHERE (sid = t_sid);
	
	-- accounts
	
	SELECT array_agg(json_build_object(
		'provider',  "type",
		'key',       "key",
		'j_doc',     "j_doc"
	))
	INTO aAccounts
	FROM "users_auths"
	WHERE "user_id" = i_user_id AND "type" != 'email_passw';
	
	-- merge
	
	jUser := utils__j_merge(
		jUser,
		json_build_object(
			'comp',         jComp,
			'accounts',     COALESCE(aAccounts, ARRAY[]::json[]),
			'version',      COALESCE(iMaxEventId, 0)
		)
	);
	
	RETURN jUser;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'user_state failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.user_state(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: user_update(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION user_update(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	aParams text[];
	tTest text;
	tpWorkspace "user"."tp_workspace";
	tSQL text;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	
BEGIN
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	tTest := cm->>'workspace';
	IF tTest IS NOT NULL THEN
		BEGIN
			tpWorkspace := tTest::"user"."tp_workspace";
		EXCEPTION WHEN OTHERS THEN
			RETURN error(-1, format('invalid workspace(%s)', tTest));
		END;
	END IF;
	
	aParams := "utils"."prepare_update"(
		cm,
		'{
			"flags":       {"col": "flags",      "type": "number"},
			"first_name":  {"col": "first_name", "type": "text"},
			"last_name":   {"col": "last_name",  "type": "text"},
			"pat_name":    {"col": "pat_name",   "type": "text"},
			"birthday":    {"col": "birthday",   "type": "date"},
			"icq":         {"col": "icq",        "type": "text"},
			"mobile":      {"col": "mobile",     "type": "mobile"},
			"skype":       {"col": "skype",      "type": "text"},
			"position":    {"col": "position",   "type": "text"},
			"workspace":   {"col": "workspace",  "type": "text"},
			"j_doc":       {"col": "j_doc",      "type": "json"}
		}'
	);
	--RAISE LOG 'aParams=%', aParams;
	
	IF (aParams IS NOT NULL) AND (array_length(aParams, 1) > 0) THEN
		tSQL := format('UPDATE users SET %s WHERE (id=%s)', array_to_string(aParams, ','), i_user_id);
		RAISE LOG 'tSQL: %', tSQL;
		EXECUTE tSQL;
	END IF;
	
	RETURN json_build_object();
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME;
		RAISE LOG 'main failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM;
		IF (eConstr = 'users_icq_idx') THEN RETURN error(-1, 'icq already used'); END IF;
		IF (eConstr = 'users_mobile_idx') THEN RETURN error(-2, 'mobile already used'); END IF;
		IF (eConstr = 'users_skype_idx') THEN RETURN error(-3, 'skype already used'); END IF;
		RETURN error(-2000, 'unhandled error ' || SQLSTATE);
END;
$$;


ALTER FUNCTION public.user_update(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: users_list(bigint, text, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION users_list(i_user_id bigint, t_sid text, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iCompId bigint;
	
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "id",
		"fields": {
			"id":                {"select": "us.id",                         "type": "number"},
			"flags":             {"select": "us.flags",                      "type": "number"},
			"first_name":        {"select": "us.first_name",                 "type": "text"},
			"last_name":         {"select": "us.last_name",                  "type": "text"},
			"pat_name":          {"select": "us.pat_name",                   "type": "text"},
			"icq":               {"select": "us.icq",                        "type": "text"},
			"mobile":            {"select": "us.mobile",                     "type": "text"},
			"skype":             {"select": "us.skype",                      "type": "text"},
			"email":             {"select": "us.email",                      "type": "text"},
			"gender":            {"select": "us.gender",                     "type": "text"},
			"birthday":          {"select": "us.birthday",                   "type": "text"},
			"position":          {"select": "us.position",                   "type": "text"},
			"comp_id":           {"select": "us.comp_id",                    "type": "number"},
			"comp_flags":        {"select": "us.comp_flags",                 "type": "number"}
		}
	}';
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	aFilters json[];
	jFilter json;
	
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[];
	
BEGIN
	
	--RAISE LOG 'price_requests_list, time=%s', utils__now_utc();
	
	IF (i_user_id IS NULL) OR (t_sid IS NULL) THEN RETURN error(-1011, 'invalid sid'); END IF;
	
	SELECT comp_id INTO iCompId FROM users WHERE (id = i_user_id);
	IF (iCompId IS NULL) THEN RETURN error(-1, format('user(%s) must have comp', i_user_id)); END IF;
	--RAISE LOG 'iCompId=%', iCompId;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := cm->>'offset';
	iLimit      := cm->>'limit';
	IF (tOrderBy IS NULL) OR ((jCfg->'fields'->tOrderBy) IS NULL) THEN tOrderBy = jCfg->>'default_field'; END IF;
	IF (tDir IS NULL) OR (NOT (tDir = ANY(ARRAY['ASC','DESC']))) THEN tDir := 'ASC'; END IF;
	IF (iOffset IS NULL) THEN iOffset = 0; END IF;
	IF (iLimit IS NULL) THEN iLimit = 50; ELSIF (iLimit < 1) THEN iLimit = 1; ELSIF (iLimit > 500) THEN iLimit = 500; END IF;
	--RAISE LOG 'tOrderBy=% tDir=% iOffset=% iLimit=%', tOrderBy, tDir, iOffset, iLimit;
	
	aFields := utils__json2array(cm->'fields');
	IF (aFields IS NOT NULL) AND (coalesce(array_length(aFields, 1), 0) > 0) THEN
		FOREACH tField IN ARRAY aFields LOOP
			IF ((jCfg->'fields'->tField) IS NOT NULL) THEN
				aSelection := aSelection || (jCfg->'fields'->tField->>'select');
			END IF;
		END LOOP;
	END IF;
	IF (coalesce(array_length(aSelection, 1), 0) < 1) THEN
		aSelection := aSelection || (jCfg->'fields'->(jCfg->>'default_field')->>'select');
	END IF;
	
	BEGIN
		SELECT array_agg(el) INTO aFilters FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN others THEN NULL;
	END;
	--RAISE LOG 'aFilters=%', aFilters;
	
	IF (aFilters IS NOT NULL) THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			--RAISE LOG 'jFilter=% json_typeof=%', jFilter, json_typeof(jFilter);
			CONTINUE WHEN (json_typeof(jFilter) != 'object');
			
			tCol := jFilter->>'col';
			tVal := jFilter->>'val';
			--RAISE LOG 'tCol=% tVal=%', tCol, tVal;
			CONTINUE WHEN (tCol IS NULL) OR ((jCfg->'fields'->tCol) IS NULL) OR (tVal IS NULL);
			
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('%I < %L', tCol, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%I > %L', tCol, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%I = %L', tCol, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE jFilter->>'op'
						WHEN 'lt' THEN aWhere := aWhere || format('utils__ts2int(%I) < %L', tCol, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('utils__ts2int(%I) > %L', tCol, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('utils__ts2int(%I) = %L', tCol, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%I ~* E%L', tCol, tVal);
			ELSE
			END CASE;
			
		END LOOP;
	END IF;
	
	--aWhere := aWhere || format('count(cr.relation_id) > 0');
	
	tQuery := format(
		'
			CREATE TEMP TABLE t1 ON COMMIT DROP AS
			SELECT %I __key__
			FROM users
		',
		jCfg->>'default_field'
	);
	IF (coalesce(array_length(aWhere, 1), 0) > 0) THEN tQuery := tQuery || format(' WHERE (%s)', array_to_string(aWhere, ') AND (')); END IF;
	
	--RAISE LOG 'tQuery=%', tQuery;
	EXECUTE tQuery;
	
	SELECT count(*) FROM t1 INTO iTotal;
	--RAISE LOG 'iTotal=%', iTotal;
	
	aResult := ARRAY[]::json[];
	IF (iTotal > 0) THEN
		tQuery := format(
			'SELECT * FROM (
				SELECT %s
				FROM t1
				LEFT JOIN users us ON (t1.__key__ = us.%I)
				ORDER BY %I %s OFFSET %L LIMIT %L
			) q1',
			array_to_string(aSelection, ', '), jCfg->>'default_field', tOrderBy, tDir, iOffset, iLimit
		);
		--RAISE LOG 'tQuery=%', tQuery;
		FOR oRec IN EXECUTE tQuery LOOP
			aResult := aResult || row_to_json(oRec);
			--RAISE LOG 'record=%', row_to_json(oRec);
		END LOOP;
	END IF;
	
	RETURN json_build_object('total', iTotal, 'data', array_to_json(aResult));
	
END;
$$;


ALTER FUNCTION public.users_list(i_user_id bigint, t_sid text, cm json) OWNER TO cargochat_u;

--
-- Name: utils__comp_tags_check(bigint, bigint, comp.tp_comp_relation_type, comp.tp_comp_tag); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__comp_tags_check(i_comp_from bigint, i_comp_to bigint, t_relation_type comp.tp_comp_relation_type, t_tag comp.tp_comp_tag) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iRelCnt bigint;
	iCompId bigint;
	bInsertTag boolean;
	bHaveTag boolean;
	tpTagTradeFrom "comp"."tp_comp_tag";
	bHardTagTradeFrom boolean;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	--RAISE LOG E'\n\n--- utils__comp_tags_check i_comp_from=% i_comp_to=% t_relation_type=% t_tag=%\n\n', i_comp_from, i_comp_to, t_relation_type, t_tag;
	
	IF i_comp_from IS NOT NULL THEN
		iCompId := i_comp_from;
		PERFORM * FROM "comp_relations" WHERE "comp_from" = i_comp_from AND "relation_type" = t_relation_type;
		bInsertTag := FOUND;
	ELSIF i_comp_to IS NOT NULL THEN
		iCompId := i_comp_to;
		PERFORM * FROM "comp_relations" WHERE "comp_to"   = i_comp_to   AND "relation_type" = t_relation_type;
		bInsertTag := FOUND;
	ELSE
		RETURN -1;
	END IF;
	
	PERFORM * FROM "comp_tags" WHERE "comp_id" = iCompId AND "tag" = t_tag;
	bHaveTag := FOUND;
	
	--RAISE LOG ' --- iRelCnt=% bInsertTag=% iCompId=% bHaveTag=%', iRelCnt, bInsertTag, iCompId, bHaveTag;
	
	IF bInsertTag IS FALSE AND i_comp_from IS NOT NULL THEN
		tpTagTradeFrom := 'trade_from'::"comp"."tp_comp_tag";
		IF t_tag = tpTagTradeFrom THEN
			SELECT hard_tag_trade_from INTO bHardTagTradeFrom FROM comps WHERE (id = i_comp_from);
			IF bHardTagTradeFrom IS TRUE THEN
				bInsertTag := TRUE;
			END IF;
		END IF;
	END IF;
	
	IF bInsertTag THEN
		IF bHaveTag IS FALSE THEN
			--RAISE LOG '--- insert iCompId=% tag=%', iCompId, t_tag;
			INSERT INTO "comp_tags" ("comp_id", "tag") VALUES (iCompId, t_tag);
		END IF;
	ELSE
		IF bHaveTag IS TRUE THEN
			--RAISE LOG '--- delete iCompId=% tag=%', iCompId, t_tag;
			DELETE FROM "comp_tags" WHERE "comp_id" = iCompId AND "tag" = t_tag;
		END IF;
	END IF;
	
	RETURN 0;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'utils_comp_tags_check failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RETURN -100;
END;
$$;


ALTER FUNCTION public.utils__comp_tags_check(i_comp_from bigint, i_comp_to bigint, t_relation_type comp.tp_comp_relation_type, t_tag comp.tp_comp_tag) OWNER TO cargochat_u;

--
-- Name: utils__distance_between_points(double precision, double precision, double precision, double precision); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__distance_between_points(llong1 double precision, llat1 double precision, llong2 double precision, llat2 double precision) RETURNS double precision
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
	
	rad bigint = 6372795;  -- радиус сферы (Земли)
	lat1 double precision;
	lat2 double precision;
	long1 double precision;
	long2 double precision;
	cl1 double precision;
	cl2 double precision;
	sl1 double precision;
	sl2 double precision;
	delta double precision;
	cdelta double precision;
	sdelta double precision;
	x double precision;
	y double precision;
	ad double precision;
	
BEGIN
	
	-- в радианах
	lat1 = llat1*pi()/180;
	lat2 = llat2*pi()/180;
	long1 = llong1*pi()/180;
	long2 = llong2*pi()/180;
	
	-- косинусы и синусы широт и разницы долгот
	cl1 = cos(lat1);
	cl2 = cos(lat2);
	sl1 = sin(lat1);
	sl2 = sin(lat2);
	delta = long2 - long1;
	cdelta = cos(delta);
	sdelta = sin(delta);
	
	-- вычисления длины большого круга
	y = sqrt(power(cl2*sdelta,2)+power(cl1*sl2-sl1*cl2*cdelta,2));
	x = sl1*sl2+cl1*cl2*cdelta;
	ad = atan2(y,x);
	
	RETURN ad*rad;
	
END;
$$;


ALTER FUNCTION public.utils__distance_between_points(llong1 double precision, llat1 double precision, llong2 double precision, llat2 double precision) OWNER TO cargochat_u;

--
-- Name: utils__email_test(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__email_test(t_email text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $_$
BEGIN
	
	--RAISE LOG 'utils__email_test %', t_email;
	
	RETURN (t_email IS NOT NULL) AND (t_email ~ '^[A-Za-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&''*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$');
	
END;
$_$;


ALTER FUNCTION public.utils__email_test(t_email text) OWNER TO cargochat_u;

--
-- Name: utils__int2utc(integer); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__int2utc(i_ts integer) RETURNS timestamp without time zone
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  select timezone('utc', to_timestamp(i_ts));
$$;


ALTER FUNCTION public.utils__int2utc(i_ts integer) OWNER TO cargochat_u;

--
-- Name: utils__j_merge(json, json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__j_merge(data json, merge_data json) RETURNS json
    LANGUAGE sql IMMUTABLE
    AS $$
    SELECT json_object_agg(key, value)
    FROM (
        WITH to_merge AS (
            SELECT * FROM json_each(merge_data)
        )
        SELECT * FROM json_each(data)
        WHERE key NOT IN (SELECT key FROM to_merge)
        UNION ALL
        SELECT * FROM to_merge
    ) t;
$$;


ALTER FUNCTION public.utils__j_merge(data json, merge_data json) OWNER TO cargochat_u;

--
-- Name: utils__json2array(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__json2array(j_doc json) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
	arr text[] DEFAULT NULL;
BEGIN
	BEGIN
		SELECT array_agg(elem) INTO arr FROM json_array_elements_text(j_doc) elem;
	EXCEPTION WHEN OTHERS THEN
		--RAISE LOG 'utils__json2array failed: j_doc=%', j_doc;
		RETURN NULL;
	END;
	RETURN arr;
END;
$$;


ALTER FUNCTION public.utils__json2array(j_doc json) OWNER TO cargochat_u;

--
-- Name: utils__json2arrayofbigint(json); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__json2arrayofbigint(j_doc json) RETURNS bigint[]
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
	
	a1 text[] DEFAULT NULL;
	t1 text;
	a2 bigint[] DEFAULT NULL;
	
BEGIN
	
	BEGIN
		SELECT array_agg(elem) INTO a1 FROM json_array_elements_text(j_doc) elem;
	EXCEPTION
		WHEN OTHERS THEN RETURN NULL;
	END;
	
	--RAISE LOG 'a1=%', a1;
	
	IF (a1 IS NOT NULL) THEN
		
		FOREACH t1 IN ARRAY a1 LOOP
			BEGIN
				a2 := a2 || t1::bigint;
			EXCEPTION
				WHEN OTHERS THEN NULL;
			END;
		END LOOP;
	
	END IF;
	
	RETURN a2;
	
END;
$$;


ALTER FUNCTION public.utils__json2arrayofbigint(j_doc json) OWNER TO cargochat_u;

--
-- Name: utils__json_key_exists(json, text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__json_key_exists(j json, k text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
	b BOOLEAN;
BEGIN
	SELECT k = ANY(ARRAY_AGG(x)) INTO b FROM json_object_keys(j) x;
	RETURN b;
END;
$$;


ALTER FUNCTION public.utils__json_key_exists(j json, k text) OWNER TO cargochat_u;

--
-- Name: utils__json_object_update_key(json, text, anyelement); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__json_object_update_key(json json, key_to_set text, value_to_set anyelement) RETURNS json
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
SELECT CASE
  WHEN ("json" -> "key_to_set") IS NULL THEN "json"
  ELSE (SELECT concat('{', string_agg(to_json("key") || ':' || "value", ','), '}')
          FROM (SELECT *
                  FROM json_each("json")
                 WHERE "key" <> "key_to_set"
                 UNION ALL
                SELECT "key_to_set", to_json("value_to_set")) AS "fields")::json
END
$$;


ALTER FUNCTION public.utils__json_object_update_key(json json, key_to_set text, value_to_set anyelement) OWNER TO cargochat_u;

--
-- Name: utils__msg_channel_invite_allow_check(bigint, bigint); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__msg_channel_invite_allow_check(i_user_inviter bigint, i_user_invited bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iFlags bigint;
	iContactId bigint;
	iInviterCompId bigint;
	iInvitedCompId bigint;
	iRelationId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	eStack text;
	
BEGIN
	
	-- проверка на возможность приглашения в каналы юзера i_user_invited юзером i_user_inviter
	
	--RAISE LOG 'utils__msg_channel_invite_allow_check i_user_inviter=% i_user_invited=%', i_user_inviter, i_user_invited;
	
	SELECT "comp_id" INTO iInviterCompId FROM "users" WHERE "id" = i_user_inviter;
	SELECT "comp_id" INTO iInvitedCompId FROM "users" WHERE "id" = i_user_invited;
	--RAISE LOG 'iInviterCompId=% iInvitedCompId=%', iInviterCompId, iInvitedCompId;
	
	IF (iInviterCompId = iInvitedCompId) IS FALSE THEN  -- отправитель и получатель в разных компаниях
		
		SELECT "flags" INTO iFlags FROM "users" WHERE "id" = i_user_invited;
		--RAISE LOG 'user(%) flags=%', i_user_invited, iFlags;
		
		IF NOT FOUND THEN RETURN error(-1, format('user(%s) not found', i_user_invited)); END IF;
		
		IF "utils"."flgchk"(iFlags, "user"."_flg_ch_none"()) IS TRUE THEN  -- юзер запретил все приглашения
			RETURN error(-1, format('user(%s) does not accept any channels', i_user_invited));
		END IF;
		
		IF "utils"."flgchk"(iFlags, "user"."_flg_ch_any"()) IS NOT TRUE THEN  -- юзер не разрешил все приглашения
			
			IF "utils"."flgchk"(iFlags, "user"."_flg_ch_contacts"()) IS TRUE THEN  -- юзер разрешил приглашения от контактов
				
				SELECT "contact_id" INTO iContactId FROM "user"."contacts" WHERE "user_id" = i_user_inviter AND "contact_user_id" = i_user_invited;
				
			ELSIF "utils"."flgchk"(iFlags, "user"."_flg_ch_relations"()) IS TRUE THEN  -- юзер разрешил приглашения от сотрудников связанных компаний
				
				IF (iInviterCompId IS NOT NULL) AND (iInvitedCompId IS NOT NULL) THEN  -- компании есть у обоих юзеров, смотрим есть ли связь между компаниями
					SELECT relation_id
					INTO iRelationId
					FROM comp_relations
					WHERE (
						(
							(comp_from = iInviterCompId AND comp_to = iInvitedCompId)
							OR
							(comp_from = iInvitedCompId AND comp_to = iInviterCompId)
						)
						AND
						relation_type != 'blacklist'
					);
				END IF;
				
			END IF;
			
			--RAISE LOG 'iContactId=% iRelationId=%', iContactId, iRelationId;
			
			IF iContactId IS NULL AND iRelationId IS NULL THEN  -- отправителья нет в контактах получателя и между компаниям нет связей: канал запрещен
				RETURN error(-1, format('user(%s) does not accept channels from you(%s)', i_user_invited, i_user_inviter));
			END IF;
			
		END IF;
		
	END IF;  -- иначе отправитель и получатель в одной компании, тогда каналы разрешены
	
	RETURN json_build_object(
		'allowed',       true,
		'flags',         iFlags,
		'contact_id',    iContactId,
		'inviter_comp',  iInviterCompId,
		'invited_comp',  iInvitedCompId,
		'relation_id',   iRelationId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'utils__msg_channel_invite_allow_check failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.utils__msg_channel_invite_allow_check(i_user_inviter bigint, i_user_invited bigint) OWNER TO cargochat_u;

--
-- Name: utils__msg_private_allow_check(bigint, bigint); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__msg_private_allow_check(i_user_sender bigint, i_user_receiver bigint) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iFlags bigint;
	iContactId bigint;
	iSenderCompId bigint;
	iReceiverCompId bigint;
	iRelationId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstr text;
	eStack text;
	
BEGIN
	
	-- проверка на возможность отправки приватного сообщения от юзера i_user_sender к i_user_receiver
	
	--RAISE LOG 'utils__msg_private_allow_check % %', i_user_from, i_user_to;
	
	SELECT "comp_id" INTO iSenderCompId   FROM "users" WHERE "id" = i_user_sender;
	SELECT "comp_id" INTO iReceiverCompId FROM "users" WHERE "id" = i_user_receiver;
	--RAISE LOG 'iSenderCompId=% iReceiverCompId=%', iSenderCompId, iReceiverCompId;
	
	IF (iSenderCompId = iReceiverCompId) IS FALSE THEN  -- отправитель и получатель в разных компаниях
		
		SELECT "flags" INTO iFlags FROM "public"."users" WHERE "id" = i_user_receiver;
		--RAISE LOG 'user(%) flags=%', i_user_to, iFlags;
		
		IF NOT FOUND THEN RETURN error(-1, format('user(%s) not found', i_user_receiver)); END IF;
		
		IF "utils"."flgchk"(iFlags, "user"."_flg_prv_none"()) IS TRUE THEN  -- юзер запретил все приваты
			RETURN error(-1, format('user(%s) does not accept any private', i_user_receiver));
		END IF;
		
		IF "utils"."flgchk"(iFlags, "user"."_flg_prv_any"()) IS NOT TRUE THEN  -- юзер не разрешил все приваты
			
			IF "utils"."flgchk"(iFlags, "user"."_flg_prv_contacts"()) IS TRUE THEN  -- юзер разрешил приваты от контактов
				
				SELECT "contact_id" INTO iContactId FROM "user"."contacts" WHERE "user_id" = i_user_sender AND "contact_user_id" = i_user_receiver;
				
			ELSIF "utils"."flgchk"(iFlags, "user"."_flg_prv_relations"()) IS TRUE THEN  -- юзер разрешил приваты от сотрудников связанных компаний
				
				IF (iSenderCompId IS NOT NULL) AND (iReceiverCompId IS NOT NULL) THEN  -- компании есть у обоих юзеров, смотрим есть ли связь между компаниями
					SELECT relation_id
					INTO iRelationId
					FROM comp_relations
					WHERE (
						(
							(comp_from = iSenderCompId AND comp_to = iReceiverCompId)
							OR
							(comp_from = iReceiverCompId AND comp_to = iSenderCompId)
						)
						AND
						relation_type != 'blacklist'
					);
				END IF;
				
			END IF;
			
			--RAISE LOG 'iContactId=% iRelationId=%', iContactId, iRelationId;
			
			IF iContactId IS NULL AND iRelationId IS NULL THEN  -- отправителья нет в контактах получателя и между компаниям нет связей: приват запрещен
				RETURN error(-1, format('user(%s) does not accept private from you(%s)', i_user_receiver, i_user_sender));
			END IF;
			
		END IF;
		
	END IF;  -- иначе отправитель и получатель в одной компании, тогда приваты разрешены
	
	RETURN json_build_object(
		'allowed',       true,
		'flags',         iFlags,
		'contact_id',    iContactId,
		'sender_comp',   iSenderCompId,
		'receiver_comp', iReceiverCompId,
		'relation_id',   iRelationId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstr = CONSTRAINT_NAME, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'utils__msg_private_allow_check failed: SQLSTATE=% table="%" col="%" detail="%" constr=% SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, eConstr, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION public.utils__msg_private_allow_check(i_user_sender bigint, i_user_receiver bigint) OWNER TO cargochat_u;

--
-- Name: utils__now_utc(); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__now_utc() RETURNS timestamp without time zone
    LANGUAGE sql STABLE STRICT
    AS $$
  select now() at time zone 'utc';
$$;


ALTER FUNCTION public.utils__now_utc() OWNER TO cargochat_u;

--
-- Name: utils__passw_test(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__passw_test(t_passw text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $_$
BEGIN
	IF ((t_passw IS NULL) OR (length(t_passw) < 1) OR (t_passw ~ '^ ') OR (t_passw ~ ' $')) THEN
		RETURN FALSE;
	END IF;
	RETURN TRUE;
END;
$_$;


ALTER FUNCTION public.utils__passw_test(t_passw text) OWNER TO cargochat_u;

--
-- Name: utils__text2bigint(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__text2bigint(val text) RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
	iVal bigint DEFAULT NULL;
BEGIN
	BEGIN
		iVal := val::bigint;
	EXCEPTION WHEN OTHERS THEN
		--RAISE LOG 'Invalid bigint value: "%"', val;
		RETURN NULL;
	END;
	RETURN iVal;
END;
$$;


ALTER FUNCTION public.utils__text2bigint(val text) OWNER TO cargochat_u;

--
-- Name: utils__text2date(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__text2date(val text) RETURNS date
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
	d date DEFAULT NULL;
BEGIN
	BEGIN
		d := val::date;
	EXCEPTION WHEN OTHERS THEN
		--RAISE LOG 'Invalid date value: "%"', val;
		RETURN NULL;
	END;
	RETURN d;
END;
$$;


ALTER FUNCTION public.utils__text2date(val text) OWNER TO cargochat_u;

--
-- Name: utils__text2float(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__text2float(val text) RETURNS double precision
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
	fVal double precision DEFAULT NULL;
BEGIN
	BEGIN
		fVal := val::double precision;
	EXCEPTION WHEN OTHERS THEN
		--RAISE LOG 'Invalid float value: "%"', val;
		RETURN NULL;
	END;
	RETURN fVal;
END;
$$;


ALTER FUNCTION public.utils__text2float(val text) OWNER TO cargochat_u;

--
-- Name: utils__text2int(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__text2int(val text) RETURNS integer
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
	iVal integer DEFAULT NULL;
BEGIN
	BEGIN
		iVal := val::integer;
	EXCEPTION WHEN OTHERS THEN
		--RAISE LOG 'Invalid integer value: "%"', val;
		RETURN NULL;
	END;
	RETURN iVal;
END;
$$;


ALTER FUNCTION public.utils__text2int(val text) OWNER TO cargochat_u;

--
-- Name: utils__text2ts(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__text2ts(val text) RETURNS timestamp without time zone
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $$
DECLARE
	ts timestamp without time zone DEFAULT NULL;
BEGIN
	BEGIN
		ts := val::timestamp without time zone;
	EXCEPTION WHEN OTHERS THEN
		--RAISE LOG 'Invalid timestamp value: "%"', val;
		RETURN NULL;
	END;
	RETURN ts;
END;
$$;


ALTER FUNCTION public.utils__text2ts(val text) OWNER TO cargochat_u;

--
-- Name: utils__ts2int(timestamp without time zone); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION utils__ts2int(ts timestamp without time zone) RETURNS integer
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
	--SELECT EXTRACT(EPOCH FROM ts)::integer;
	SELECT floor(EXTRACT(EPOCH FROM ts))::integer;
$$;


ALTER FUNCTION public.utils__ts2int(ts timestamp without time zone) OWNER TO cargochat_u;

--
-- Name: wrap_comp_logo(bigint); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION wrap_comp_logo(logo bigint) RETURNS text
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
BEGIN
	RETURN format('public_files/%s.jpg', logo);
END;
$$;


ALTER FUNCTION public.wrap_comp_logo(logo bigint) OWNER TO cargochat_u;

--
-- Name: wrap_comp_logo(text); Type: FUNCTION; Schema: public; Owner: cargochat_u
--

CREATE FUNCTION wrap_comp_logo(t_logo text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
BEGIN
	RETURN format('public_files/%s', t_logo);
END;
$$;


ALTER FUNCTION public.wrap_comp_logo(t_logo text) OWNER TO cargochat_u;

SET search_path = "user", pg_catalog;

--
-- Name: _flg_auth_by_phone(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_auth_by_phone() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000100'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_auth_by_phone() OWNER TO cargochat_u;

--
-- Name: _flg_ch_any(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_ch_any() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000020'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_ch_any() OWNER TO cargochat_u;

--
-- Name: _flg_ch_contacts(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_ch_contacts() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000040'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_ch_contacts() OWNER TO cargochat_u;

--
-- Name: _flg_ch_none(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_ch_none() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000010'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_ch_none() OWNER TO cargochat_u;

--
-- Name: _flg_ch_relations(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_ch_relations() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000080'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_ch_relations() OWNER TO cargochat_u;

--
-- Name: _flg_contacts_any(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_contacts_any() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000200'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_contacts_any() OWNER TO cargochat_u;

--
-- Name: _flg_contacts_contacts(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_contacts_contacts() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00001000'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_contacts_contacts() OWNER TO cargochat_u;

--
-- Name: _flg_contacts_relations(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_contacts_relations() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000400'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_contacts_relations() OWNER TO cargochat_u;

--
-- Name: _flg_contacts_typing(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_contacts_typing() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000800'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_contacts_typing() OWNER TO cargochat_u;

--
-- Name: _flg_profile_any(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_profile_any() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00002000'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_profile_any() OWNER TO cargochat_u;

--
-- Name: _flg_profile_contacts(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_profile_contacts() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00010000'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_profile_contacts() OWNER TO cargochat_u;

--
-- Name: _flg_profile_relations(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_profile_relations() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00004000'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_profile_relations() OWNER TO cargochat_u;

--
-- Name: _flg_profile_typing(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_profile_typing() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00008000'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_profile_typing() OWNER TO cargochat_u;

--
-- Name: _flg_prv_any(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_prv_any() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000002'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_prv_any() OWNER TO cargochat_u;

--
-- Name: _flg_prv_contacts(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_prv_contacts() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000004'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_prv_contacts() OWNER TO cargochat_u;

--
-- Name: _flg_prv_none(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_prv_none() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000001'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_prv_none() OWNER TO cargochat_u;

--
-- Name: _flg_prv_relations(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION _flg_prv_relations() RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN x'00000008'::bigint;
END
$$;


ALTER FUNCTION "user"._flg_prv_relations() OWNER TO cargochat_u;

--
-- Name: contacts_list(json, json); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION contacts_list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	-- schema
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "uid",
		"fields": {
			"uid":       {"select": "t.uid",                                "type": "number"},
			"ts":        {"select": "utils__ts2int(t.ts)",  "alias": "ts",  "type": "timestamp"},
			"ln":        {"select": "t.ln",                                 "type": "text"},
			"fn":        {"select": "t.fn",                                 "type": "text"},
			"pn":        {"select": "t.pn",                                 "type": "text"},
			"position":  {"select": "t.position",                           "type": "text"},
			"icq":       {"select": "t.icq",                                "type": "text"},
			"phone":     {"select": "t.phone",                              "type": "text"},
			"email":     {"select": "t.email",                              "type": "text"},
			"skype":     {"select": "t.skype",                              "type": "text"},
			"birthday":  {"select": "t.birthday",                           "type": "date"},
			"flags":     {"select": "t.flags",                              "type": "number"},
			"cid":       {"select": "t.cid",                                "type": "number"},
			"cname":     {"select": "t.cname",                              "type": "text"}
		}
	}';
	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	-- ordering, pagenation
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimitT bigint;
	iLimit bigint;
	
	-- filtering
	aFilters json[];
	jFilter json;
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	-- fetching
	c1 refcursor;
	r1 record;
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[] = ARRAY[]::json[];
	
	-- error handling
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'user.contacts_list % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	tOrderBy  := cm->>'orderBy';
	tDir      := cm->>'dir';
	iOffset   := utils__text2bigint(cm->>'offset');
	iLimit    := utils__text2bigint(cm->>'limit');
	
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF iLimit > 500 THEN iLimit = 500; END IF;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	IF coalesce(array_length(aFields, 1), 0) > 0 THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF jField IS NOT NULL THEN
				IF (jField->>'alias') IS NULL THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF coalesce(array_length(aSelection, 1), 0) < 1 THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF (jField->>'alias') IS NULL THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	
	BEGIN SELECT ARRAY_AGG(el) INTO aFilters FROM json_array_elements(cm->'filters') el; EXCEPTION WHEN OTHERS THEN NULL; END;
	
	IF aFilters IS NOT NULL THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			CONTINUE WHEN json_typeof(jFilter) != 'array' OR json_array_length(jFilter) != 3;
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			CONTINUE WHEN tCol IS NULL OR (jCfg->'fields'->tCol) IS NULL OR tVal IS NULL;
			tColFilter := jCfg->'fields'->tCol->>'select';
			CONTINUE WHEN tCol IS NULL;
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					ELSE END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					ELSE END CASE;
				WHEN 'date' THEN
					-- not implemented
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);  -- todo: use `like`, check dots
			ELSE END CASE;
		END LOOP;
	END IF;
	
	-- IF coalesce(array_length(aWhere, 1), 0) < 1 THEN aWhere := aWhere || 'TRUE'::text; END IF;
	aWhere := aWhere || format('"t"."user_id" = %L', iUserId);
	
	tQuery := format('
		SELECT %s FROM (
			
			SELECT
				"uid", "ts", "ln", "fn", "pn", "position", "birthday", "flags", "cid", "cname",  -- поля без контактной информации
				-- поля с контактной информацией только по флагу
				CASE WHEN "__show_contacts__" IS TRUE THEN "icq"    ELSE NULL END "icq",
				CASE WHEN "__show_contacts__" IS TRUE THEN "phone"  ELSE NULL END "phone",
				CASE WHEN "__show_contacts__" IS TRUE THEN "email"  ELSE NULL END "email",
				CASE WHEN "__show_contacts__" IS TRUE THEN "skype"  ELSE NULL END "skype"
			FROM (
				
				SELECT
					"uid", "ts", "ln", "fn", "pn", "position", "birthday", "flags", "cid", "cname", "icq", "phone", "email", "skype",  -- все поля подряд
					(
						("__c_any__" IS TRUE)
							OR
						("__c_rels__" IS TRUE AND "__rels__" > 0)
							OR
						("__c_cons__" IS TRUE AND "__contacts__" > 0)
							OR
						("__c_prvs__" IS TRUE AND "__privates__" > 0)
					) "__show_contacts__"  -- флаг открытости контактной информации
				FROM (
					
					SELECT
						"t"."contact_user_id"         "uid",
						"t"."ctime"                   "ts",
						"u"."last_name"               "ln",
						"u"."first_name"              "fn",
						"u"."pat_name"                "pn",
						"u"."position",
						"u"."icq",
						"u"."mobile"                  "phone",
						"u"."email",
						"u"."skype",
						"u"."birthday",
						"u"."flags",
						"u"."comp_id"                 "cid",
						"c"."name"                    "cname",
						COUNT("r"."relation_id")      "__rels__",
						COUNT("n"."contact_user_id")  "__contacts__",
						COUNT("p"."private_id")       "__privates__",
						"utils"."flgchk"("u"."flags", "user"."_flg_contacts_any"())        "__c_any__",   -- контакты открыты всем
						"utils"."flgchk"("u"."flags", "user"."_flg_contacts_relations"())  "__c_rels__",  -- связанным через компании
						"utils"."flgchk"("u"."flags", "user"."_flg_contacts_contacts"())   "__c_cons__",  -- тем кто у меня в контактах
						"utils"."flgchk"("u"."flags", "user"."_flg_contacts_typing"())     "__c_prvs__"   -- тем с кем была переписка
					FROM "user"."contacts" "t"
					LEFT JOIN "public"."users" "u" ON "t"."contact_user_id" = "u"."id"  -- данные юзера контакта
					LEFT JOIN "public"."comps" "c" ON "c"."id" = "u"."comp_id"  -- данные компании контакта
					LEFT JOIN "public"."comp_relations" "r" ON ("r"."comp_from" = "u"."comp_id" AND "r"."comp_to" = %L) OR ("r"."comp_from" = %L AND "r"."comp_to" = "u"."comp_id")  -- данные связей компаний: моей и контекта
					LEFT JOIN "user"."contacts" "n" ON "n"."user_id" = "t"."contact_user_id" AND "n"."contact_user_id" = %L  -- есть ли я в контактах у контакта
					LEFT JOIN "public"."msg_privates" "p" ON ("p"."user1_id" = %L AND "p"."user2_id" = "t"."contact_user_id") OR ("p"."user2_id" = %L AND "p"."user1_id" = "t"."contact_user_id")
					WHERE (%s)
					GROUP BY "uid", "ts", "ln", "fn", "pn", "position", "icq", "u"."mobile", "u"."email", "skype", "birthday", "flags", "cid", "cname"
					
				) "t"
				WHERE
					("utils"."flgchk"("t"."flags", "user"."_flg_profile_any"()) IS TRUE)  -- юзер разрешил показывать профиль всем
						OR
					("utils"."flgchk"("t"."flags", "user"."_flg_profile_relations"()) IS TRUE AND "t"."__rels__" > 0)  -- разрешил связанным через компании
						OR
					("utils"."flgchk"("t"."flags", "user"."_flg_profile_contacts"()) IS TRUE AND "t"."__contacts__" > 0)  -- разрешил тем кто у него в контактах
						OR
					("utils"."flgchk"("t"."flags", "user"."_flg_profile_typing"()) IS TRUE AND "t"."__privates__" > 0)  -- разрешил тем с кем была переписка
				
			) "t"
			
		) "t"
		ORDER BY %s %s',
		array_to_string(aSelection, ', '),
		iCompId, iCompId, iUserId, iUserId, iUserId,
		array_to_string(aWhere, ') AND ('),
		tOrderBy, tDir
	);
	RAISE LOG 'tQuery: %', tQuery;
	
	OPEN c1 FOR EXECUTE tQuery;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS iTotal = ROW_COUNT;
	RAISE LOG 'iTotal=%', iTotal;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD iOffset IN c1;
	iLimitT := iLimit;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		aResult := aResult || row_to_json(r1);
		IF iLimit <= 1 THEN EXIT; END IF;
		iLimit := iLimit - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total', iTotal,
		'offset', iOffset,
		'limit', iLimitT,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'user.contacts_list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "user".contacts_list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: invite_accept(json); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION invite_accept(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tToken text;
	tPassw text;
	tPasswHash text;
	iSMScode bigint;
	tLastName text;
	tFirstName text;
	tPatName text;
	
	iUserInviteId bigint;
	tEmail text;
	tPosition text;
	tPhone text;
	iCompId bigint;
	iUserId bigint;
	
	eTable text;
	eCol text;
	eConstraint text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'user.invite_accept';
	
	tToken = cm->>'token';
	tPassw = cm->>'passw';
	tLastName = cm->>'last_name';
	tFirstName = cm->>'first_name';
	tPatName = cm->>'pat_name';
	iSMScode = utils__text2bigint(cm->>'sms_code');
	
	IF tToken IS NULL THEN RETURN error(-1, 'token required'); END IF;
	IF tLastName IS NULL THEN RETURN error(-1, 'last_name required'); END IF;
	IF tFirstName IS NULL THEN RETURN error(-1, 'first_name required'); END IF;
	IF tPatName IS NULL THEN RETURN error(-1, 'pat_name required'); END IF;
	IF tPassw IS NULL THEN RETURN error(-2, 'passw required'); END IF;
	IF iSMScode IS NULL THEN RETURN error(-2, 'sms_code required'); END IF;
	tPasswHash := md5(get_const('salt_passw') || tPassw);
	
	SELECT "user_invite_id", "comp_id", "email", "position", "phone"
	INTO iUserInviteId, iCompId, tEmail, tPosition, tPhone
	FROM "user"."invites"
	WHERE "token" = tToken AND "smscode" = iSMScode;
	IF NOT FOUND THEN RETURN error(-3, 'invalid token or sms_code'); END IF;
	RAISE LOG 'user_invite_accept % % % %', iUserInviteId, iCompId, tEmail, tPosition;
	
	BEGIN
		INSERT INTO "users" ("last_name", "first_name", "pat_name", "email", "comp_id", "position", "mobile")
			VALUES (tLastName, tFirstName, tPatName, tEmail, iCompId, tPosition,  tPhone)
			RETURNING "id" INTO iUserId;
		INSERT INTO "users_auths" ("user_id", "type", "key", "secret")
			VALUES (iUserId, 'email_passw', tEmail, tPasswHash);
	EXCEPTION
		WHEN OTHERS THEN
			GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eConstraint = CONSTRAINT_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
			RAISE LOG 'user.invite_accept failed: SQLSTATE=% table="%" col="%" eConstraint="%" detail="%" SQLERRM="%" eStack="%"', SQLSTATE, eTable, eCol, eConstraint, eDetail, SQLERRM, eStack;
			IF eTable = 'users' AND eConstraint = 'users_email_idx' THEN RETURN error(-1, format('email(%s) used', tEmail)); END IF;
			RETURN error(-2000, format('user creating failed %s', SQLSTATE));
	END;
	
	DELETE FROM "user"."invites" WHERE "user_invite_id" = iUserInviteId;
	
	RETURN "user"."login"(
		json_build_object(
			'email', tEmail,
			'passw', tPassw
		),
		TRUE
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eConstraint = CONSTRAINT_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'user_invite_accept failed: SQLSTATE=% table="%" col="%" eConstraint="%" detail="%" SQLERRM="%" eStack="%"', SQLSTATE, eTable, eCol, eConstraint, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "user".invite_accept(cm json) OWNER TO cargochat_u;

--
-- Name: invite_create(json, json); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION invite_create(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	tEmail text;
	tFirstName text;
	tPatName text;
	tLastName text;
	tPosition text;
	tPhone text;
	tToken text;
	iInviteId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	--IF (perm_test(iUserId, iCompId, 'comp_user_invite') IS NOT TRUE) THEN
	IF comp_user_perm_test(iUserId, iCompId, const.user_comp_perm__invites_manager()) IS NOT TRUE THEN
		RETURN error(-1, format('perm(%s) required: user(%s) comp(%s)', 'invites_manager', iUserId, iCompId));
	END IF;
	
	tEmail = cm->>'email';
	tFirstName = cm->>'first_name';
	tPatName = cm->>'pat_name';
	tLastName = cm->>'last_name';
	tPosition = cm->>'position';
	tPhone = cm->>'phone';
	--RAISE LOG 'tEmail=% tFIO=%', tEmail, tFIO;
	IF tEmail IS NULL THEN RETURN error(-1, 'email required'); END IF;
	IF utils__email_test(tEmail) IS NOT TRUE THEN RETURN error(-1, 'invalid email'); END IF;
	IF tPosition IS NULL THEN RETURN error(-1, 'position required'); END IF;
	
	PERFORM * FROM users WHERE (email = tEmail);
	IF (FOUND) THEN RETURN error(-1, 'email used'); END IF;
	
	tToken := bigint2ut(nextval('public_file_id_seq'::regclass));
	BEGIN
		INSERT INTO "user"."invites" (
			"email",
			"first_name",
			"pat_name",
			"last_name",
			"position",
			"phone",
			"comp_id",
			"token"
		)
		VALUES (
			tEmail,
			tFirstName,
			tPatName,
			tLastName,
			tPosition,
			tPhone,
			iCompId,
			tToken
		)
		RETURNING "user_invite_id" INTO iInviteId;
	EXCEPTION
		WHEN unique_violation THEN
			GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
			--RAISE LOG 'user.invites intert failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint;
			IF eConstraint = 'user_invites_email_idx' THEN RETURN error(-1, 'email used'); END IF;
			RETURN error(-2000, format('user_invites intert failed: %s', SQLSTATE));
		WHEN OTHERS THEN
			RETURN error(-2000, format('user_invites insert failed: %s', SQLSTATE));
	END;
	
	RETURN json_build_object(
		'invite_id', iInviteId,
		'token', tToken
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'user_invite_create failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "user".invite_create(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: invite_delete(json, json); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION invite_delete(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	iInviteId bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eConstraint text;
	
BEGIN
	
	RAISE LOG 'user.invite_delete % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	iInviteId := utils__text2bigint(cm->>'invite_id');
	IF iInviteId IS NULL THEN RETURN error(-1, 'invite_id required'); END IF;
	
	PERFORM user_invite_id FROM "user"."invites" WHERE "user_invite_id" = iInviteId AND "comp_id" = iCompId;
	IF NOT FOUND THEN RETURN error(-1, format('invite(%s) from comp(%s) not found', iInviteId, iCompId)); END IF;
	
	--IF (perm_test(i_user_id, iCompId, 'comp_user_invite') IS NOT TRUE) THEN
	IF (comp_user_perm_test(iUserId, iCompId, const.user_comp_perm__invites_manager()) IS NOT TRUE) THEN
		RETURN error(-1, format('perm(%s) required: user(%s) comp(%s)', 'invites_manager', iUserId, iCompId));
	END IF;
	
	DELETE FROM "user"."invites" WHERE "user_invite_id" = iInviteId;
	
	RETURN json_build_object(
		'deleted_invite_id', iInviteId
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eConstraint = CONSTRAINT_NAME;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'user_invite_delete failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%" eConstraint=%', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eConstraint;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "user".invite_delete(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: invite_get(json); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION invite_get(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tToken text;
	jData json;
	
	eTable text;
	eCol text;
	eConstraint text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'user.invite_get %', cm;
	
	tToken = cm->>'token';
	IF tToken IS NULL THEN RETURN error(-1, 'token required'); END IF;
	
	SELECT json_build_object(
		'invite_id',  "user_invite_id",
		'ctime',      "public".utils__ts2int("ctime"),
		'comp_id',    "comp_id",
		'comp_name',  (SELECT "name" FROM "public"."comps" WHERE "id" = "user"."invites"."comp_id"),
		'email',      "email",
		'position',   "position",
		'phone',      "phone",
		'first_name', "first_name",
		'pat_name',   "pat_name",
		'last_name',  "last_name"
	)
	INTO jData
	FROM "user"."invites"
	WHERE "token" = tToken;
	IF NOT FOUND THEN RETURN error(-3, 'invalid token'); END IF;
	
	RETURN jData;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eConstraint = CONSTRAINT_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'user.invite_get failed: SQLSTATE=% table="%" col="%" eConstraint="%" detail="%" SQLERRM="%" eStack="%"', SQLSTATE, eTable, eCol, eConstraint, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "user".invite_get(cm json) OWNER TO cargochat_u;

--
-- Name: invite_sms(json); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION invite_sms(cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	tToken text;
	tPhoneSrc text;
	tPhoneNum text;
	iInviteId bigint;
	tsSMStime timestamp without time zone;
	cooldown_absolute bigint = 60;
	cooldown bigint = 0;
	__code__ bigint;
	
	eTable text;
	eCol text;
	eConstraint text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'user.invite_sms %', cm;
	
	tToken = cm->>'token';
	tPhoneSrc = cm->>'phone';
	IF tToken IS NULL THEN RETURN error(-1, 'token required'); END IF;
	IF tPhoneSrc IS NULL THEN RETURN error(-1, 'phone required'); END IF;
	
	SELECT array_to_string(ARRAY(SELECT SUBSTRING(regexp_matches(tPhoneSrc, '(\d)', 'g')::text FROM 2 FOR 1)), '') INTO tPhoneNum;
	IF tPhoneNum IS NULL OR length(tPhoneNum) != 11 THEN RETURN error(-1, 'invalid phone'); END IF;
	
	SELECT "user_invite_id", "smstime"
	INTO iInviteId, tsSMStime
	FROM "user"."invites"
	WHERE "token" = tToken;
	IF NOT FOUND THEN RETURN error(-3, 'invalid token'); END IF;
	
	IF tsSMStime IS NOT NULL THEN
		cooldown := cooldown_absolute - EXTRACT(EPOCH FROM utils__now_utc() - tsSMStime)::int;
		IF cooldown > 0 THEN
			RETURN json_build_object('cooldown', cooldown);
		END IF;
	END IF;
	
	__code__ := floor(random()*899999)+100000;
	
	UPDATE "user"."invites" SET
		"phone" = tPhoneNum,
		"smstime" = utils__now_utc(),
		"smscode" = __code__
	WHERE
		"user_invite_id" = iInviteId;
	
	RETURN json_build_object(
		'phone', tPhoneNum,
		'cooldown', cooldown_absolute,
		'__code__', __code__
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eConstraint = CONSTRAINT_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'user.invite_sms failed: SQLSTATE=% table="%" col="%" eConstraint="%" detail="%" SQLERRM="%" eStack="%"', SQLSTATE, eTable, eCol, eConstraint, eDetail, SQLERRM, eStack;
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "user".invite_sms(cm json) OWNER TO cargochat_u;

--
-- Name: list(json, json); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	iUserId bigint;
	iCompId bigint;
	
	-- schema
	aSelection text[]  = ARRAY[]::text[];
	jCfg json = '{
		"default_field": "uid",
		"fields": {
			"uid":       {"filter": "uid",        "select": "uid",                                 "type": "number"},
			"rts":       {"filter": "reg_ts",     "select": "utils__ts2int(ts)",  "alias": "rts",  "type": "timestamp"},
			"flg":       {"filter": "flags",      "select": "flg",                                 "type": "number"},
			"ln":        {"filter": "last_name",  "select": "ln",                                  "type": "text"},
			"fn":        {"filter": "first_name", "select": "fn",                                  "type": "text"},
			"pn":        {"filter": "pat_name",   "select": "pn",                                  "type": "text"},
			"icq":       {"filter": "icq",        "select": "icq",                                 "type": "text"},
			"phone":     {"filter": "mobile",     "select": "phone",                               "type": "text"},
			"skype":     {"filter": "skype",      "select": "skype",                               "type": "text"},
			"email":     {"filter": "email",      "select": "email",                               "type": "text"},
			"gender":    {"filter": "gender",     "select": "gender",                              "type": "text"},
			"birthday":  {"filter": "birthday",   "select": "birthday",                            "type": "text"},
			"cid":       {"filter": "comp_id",    "select": "cid",                                 "type": "number"},
			"cflg":      {"filter": "comp_flags", "select": "cflg",                                "type": "number"},
			"position":  {"filter": "position",   "select": "position",                            "type": "text"}
		}
	}';

	jField json;
	tField text;
	aFields text[] = ARRAY[]::text[];
	
	-- ordering, pagenation
	tOrderBy text;
	tDir text;
	iOffset bigint;
	iLimit bigint;
	
	-- filtering
	aFilters json[];
	jFilter json;
	aWhere text[] = ARRAY[]::text[];
	i bigint;
	tCol text;
	tOp text;
	tColFilter text;
	tVal text;
	iVal bigint;
	fVal double precision;
	
	-- fetching
	c1 refcursor;
	r1 record;
	iTotal bigint;
	tQuery text;
	oRec record;
	aResult json[] = ARRAY[]::json[];
	
	-- error handling
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	RAISE LOG 'user.list % %', cl, cm;
	
	iUserId := utils__text2bigint(cl->>'user_id');
	iCompId := utils__text2bigint(cl->>'comp_id');
	IF iUserId IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF iCompId IS NULL THEN RETURN error(-1, format('user(%s) must have comp', iUserId)); END IF;
	
	tOrderBy    := cm->>'orderBy';
	tDir        := cm->>'dir';
	iOffset     := utils__text2bigint(cm->>'offset');
	iLimit      := utils__text2bigint(cm->>'limit');
	
	IF tOrderBy IS NULL OR (jCfg->'fields'->tOrderBy) IS NULL THEN
		tOrderBy = jCfg->'fields'->(jCfg->>'default_field')->>'select';
	ELSE
		tOrderBy = jCfg->'fields'->tOrderBy->>'select';
	END IF;
	
	IF tDir IS NULL OR NOT (tDir = ANY(ARRAY['ASC','DESC'])) THEN tDir := 'ASC'; END IF;
	IF iOffset IS NULL THEN iOffset = 0; END IF;
	IF iLimit IS NULL THEN iLimit = 50; ELSIF iLimit < 1 THEN iLimit = 1; ELSIF iLimit > 500 THEN iLimit = 500; END IF;
	
	aFields := coalesce(utils__json2array(cm->'fields'), ARRAY[]::text[]);
	IF coalesce(array_length(aFields, 1), 0) > 0 THEN
		FOREACH tField IN ARRAY aFields LOOP
			jField := jCfg->'fields'->tField;
			IF jField IS NOT NULL THEN
				IF (jField->>'alias') IS NULL THEN
					aSelection := aSelection || (jField->>'select');
				ELSE
					aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	IF coalesce(array_length(aSelection, 1), 0) < 1 THEN
		jField := jCfg->'fields'->(jCfg->>'default_field');
		IF (jField->>'alias') IS NULL THEN
			aSelection := aSelection || (jField->>'select');
		ELSE
			aSelection := aSelection || format('%s %s', jField->>'select', jField->>'alias');
		END IF;
	END IF;
	
	BEGIN SELECT ARRAY_AGG(el) INTO aFilters FROM json_array_elements(cm->'filters') el; EXCEPTION WHEN OTHERS THEN NULL; END;
	
	IF aFilters IS NOT NULL THEN
		FOREACH jFilter IN ARRAY aFilters LOOP
			CONTINUE WHEN json_typeof(jFilter) != 'array' OR json_array_length(jFilter) != 3;
			tCol := jFilter->>0;
			tOp  := jFilter->>1;
			tVal := jFilter->>2;
			CONTINUE WHEN tCol IS NULL OR (jCfg->'fields'->tCol) IS NULL OR tVal IS NULL;
			tColFilter := jCfg->'fields'->tCol->>'filter';
			CONTINUE WHEN tCol IS NULL;
			CASE jCfg->'fields'->tCol->>'type'
				WHEN 'number' THEN
					fVal := utils__text2float(tVal);
					CONTINUE WHEN (fVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, fVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, fVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, fVal);
					END CASE;
				WHEN 'timestamp' THEN
					iVal := utils__text2bigint(tVal);
					CONTINUE WHEN (iVal IS NULL);
					CASE tOp
						WHEN 'lt' THEN aWhere := aWhere || format('%s < %L', tColFilter, iVal);
						WHEN 'gt' THEN aWhere := aWhere || format('%s > %L', tColFilter, iVal);
						WHEN 'eq' THEN aWhere := aWhere || format('%s = %L', tColFilter, iVal);
					END CASE;
				WHEN 'text' THEN
					aWhere := aWhere || format('%s ~* E%L', tColFilter, tVal);  -- todo: use `like`, check dots
			ELSE
			END CASE;
		END LOOP;
	END IF;
	
	IF coalesce(array_length(aWhere, 1), 0) < 1 THEN
		aWhere := aWhere || 'TRUE'::text;
	END IF;
	
	tQuery := format('
		SELECT %s FROM (
			
			SELECT
				"uid", "ts", "ln", "fn", "pn", "position", "birthday", "gender", "flg", "cid", "cflg",  -- поля без контактной информации
				-- поля с контактной информацией только по флагу
				CASE WHEN "__show_contacts__" IS TRUE THEN "icq"    ELSE NULL END "icq",
				CASE WHEN "__show_contacts__" IS TRUE THEN "phone"  ELSE NULL END "phone",
				CASE WHEN "__show_contacts__" IS TRUE THEN "email"  ELSE NULL END "email",
				CASE WHEN "__show_contacts__" IS TRUE THEN "skype"  ELSE NULL END "skype"
			FROM (
				
				SELECT
					"uid", "ts", "ln", "fn", "pn", "position", "icq", "phone", "email", "skype", "birthday", "gender", "flg", "cid", "cflg",  -- все поля подряд
					(
						("__c_any__" IS TRUE)
							OR
						("__c_rels__" IS TRUE AND "__rels__" > 0)
							OR
						("__c_cons__" IS TRUE AND "__contacts__" > 0)
							OR
						("__c_prvs__" IS TRUE AND "__privates__" > 0)
					) "__show_contacts__"  -- флаг открытости контактной информации
				FROM (
					
					SELECT
						"t"."id"                      "uid",
						"t"."reg_ts"                  "ts",
						"t"."last_name"               "ln",
						"t"."first_name"              "fn",
						"t"."pat_name"                "pn",
						"t"."position",
						"t"."icq",
						"t"."mobile"                  "phone",
						"t"."email",
						"t"."skype",
						"t"."birthday",
						"t"."gender",
						"t"."flags"                   "flg",
						"t"."comp_id"                 "cid",
						"t"."comp_flags"              "cflg",
						COUNT("r"."relation_id")      "__rels__",
						COUNT("n"."contact_user_id")  "__contacts__",
						COUNT("p"."private_id")       "__privates__",
						"utils"."flgchk"("t"."flags", "user"."_flg_contacts_any"())        "__c_any__",   -- контакты открыты всем
						"utils"."flgchk"("t"."flags", "user"."_flg_contacts_relations"())  "__c_rels__",  -- связанным через компании
						"utils"."flgchk"("t"."flags", "user"."_flg_contacts_contacts"())   "__c_cons__",  -- тем кто у меня в контактах
						"utils"."flgchk"("t"."flags", "user"."_flg_contacts_typing"())     "__c_prvs__"   -- тем с кем была переписка
					FROM "public"."users" "t"
					LEFT JOIN "public"."comps" "c" ON "c"."id" = "t"."comp_id"  -- данные компании контакта
					LEFT JOIN "public"."comp_relations" "r" ON ("r"."comp_from" = "t"."comp_id" AND "r"."comp_to" = %L) OR ("r"."comp_from" = %L AND "r"."comp_to" = "t"."comp_id")  -- данные связей компаний: моей и контекта
					LEFT JOIN "user"."contacts" "n" ON "n"."user_id" = "t"."id" AND "n"."contact_user_id" = %L  -- есть ли я в контактах у контакта
					LEFT JOIN "public"."msg_privates" "p" ON ("p"."user1_id" = %L AND "p"."user2_id" = "t"."id") OR ("p"."user2_id" = %L AND "p"."user1_id" = "t"."id")
					WHERE (%s)
					GROUP BY "t"."id", "t"."reg_ts", "t"."last_name", "t"."first_name", "t"."pat_name", "t"."position", "t"."icq", "t"."mobile", "t"."email", "t"."skype", "t"."birthday", "t"."gender", "t"."flags", "t"."comp_id", "t"."comp_flags"
					
				) "t"
				WHERE
					("utils"."flgchk"("t"."flg", "user"."_flg_profile_any"()) IS TRUE)  -- юзер разрешил показывать профиль всем
						OR
					("utils"."flgchk"("t"."flg", "user"."_flg_profile_relations"()) IS TRUE AND "t"."__rels__" > 0)  -- разрешил связанным через компании
						OR
					("utils"."flgchk"("t"."flg", "user"."_flg_profile_contacts"()) IS TRUE AND "t"."__contacts__" > 0)  -- разрешил тем кто у него в контактах
						OR
					("utils"."flgchk"("t"."flg", "user"."_flg_profile_typing"()) IS TRUE AND "t"."__privates__" > 0)  -- разрешил тем с кем была переписка
				
			) "t"
			
		) "t"
		ORDER BY %s %s',
		array_to_string(aSelection, ', '),
		iCompId, iCompId, iUserId, iUserId, iUserId,
		array_to_string(aWhere, ') AND ('),
		tOrderBy, tDir
	);
	
	RAISE LOG 'tQuery: %', tQuery;
	
	OPEN c1 FOR EXECUTE tQuery;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS iTotal = ROW_COUNT;
	RAISE LOG 'iTotal=%', iTotal;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD iOffset IN c1;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		aResult := aResult || row_to_json(r1);
		IF iLimit <= 1 THEN EXIT; END IF;
		iLimit := iLimit - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total', iTotal,
		'data', array_to_json(aResult)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'user.list failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "user".list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: login(json, boolean); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION login(cm json, b_skeep_mobile_auth boolean) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	tEmail text;
	tPassw text;
	iSmsCodeIn integer;
	iUserId bigint;
	iCompId bigint;
	tsSmstime timestamp without time zone;
	tPhone text;
	iUserFlags bigint;
	iSmsCodeGen bigint;
	cooldown_time bigint = 60;
	cooldown_rest bigint = 0;
	smscode_ttl bigint = 600;
	__code__ bigint;
	tToken text;
	sid_ttl interval;
	tSid text;
	
BEGIN
	
	--RAISE LOG '-- user.login --';
	
	tEmail := cm->>'email';
	tPassw := cm->>'passw';
	iSmsCodeIn := utils__text2bigint(cm->>'smscode');
	IF
		"public"."utils__email_test"(tEmail) IS NOT TRUE OR
		"public"."utils__passw_test"(tPassw) IS NOT TRUE THEN
			RETURN error(-1, 'invalid email or password'); END IF;
	
	tPassw := md5("public"."get_const"('salt_passw') || tPassw);
	
	--SELECT id, INTO iUserId FROM users WHERE (LOWER(email) = LOWER(tEmail)) AND (passw = tPassw);
	SELECT
		"users"."id",
		"users"."comp_id",
		"users"."smstime",
		"users"."mobile",
		"users"."flags",
		"users"."smscode"
	INTO
		iUserId,
		iCompId,
		tsSmstime,
		tPhone,
		iUserFlags,
		iSmsCodeGen
	FROM "users"
	LEFT JOIN "users_auths" ON
		"users"."id" = "users_auths"."user_id"
	WHERE
		"users_auths"."type" = 'email_passw' AND
		LOWER("users_auths"."key") = LOWER(tEmail) AND
		"users_auths"."secret" = tPassw;
	
	IF NOT FOUND THEN RETURN error(-1, 'invalid email or password'); END IF;
	
	IF EXTRACT(EPOCH FROM "public"."utils__now_utc"() - tsSmstime)::int > smscode_ttl THEN
		-- smscode просрочен
		tsSmstime := NULL;
		iSmsCodeGen := NULL;
	END IF;
	
	IF NOT (iSmsCodeGen IS NOT NULL AND iSmsCodeIn IS NOT NULL AND iSmsCodeGen = iSmsCodeIn) THEN
		
		IF
			b_skeep_mobile_auth IS NOT TRUE
			AND tPhone IS NOT NULL
			AND "utils"."flgchk"(iUserFlags, "user"."_flg_auth_by_phone"()) IS TRUE
		THEN
			
			IF tsSmstime IS NOT NULL THEN
				cooldown_rest := cooldown_time - EXTRACT(EPOCH FROM "public"."utils__now_utc"() - tsSmstime)::int;
				IF cooldown_rest > 0 THEN
					RETURN json_build_object('cooldown', cooldown_rest);
				END IF;
			END IF;
			
			UPDATE "users" SET
				"smstime" = utils__now_utc(),
				"smscode" = floor(random()*899999)+100000
			WHERE "id" = iUserId
			RETURNING "smscode" INTO __code__;
			
			RETURN json_build_object(
				'cooldown', cooldown_time,
				'phone',    tPhone,
				'__code__', __code__
			);
			
		END IF;
	
	END IF;
	
	tSid := generate_sid();
	IF tSid IS NULL THEN RETURN error(-2000, 'sidgen failed'); END IF;
	
	UPDATE "sessions" SET "user_id" = iUserId WHERE "sid" = tSid;
	UPDATE "users" SET "login_ts" = utils__now_utc(), "smstime" = NULL, "smscode" = NULL WHERE "id" = iUserId;
	
	RETURN json_build_object(
		'sid', tSid,
		'user_id', iUserId,
		'comp_id', iCompId
	);
	
END;
$$;


ALTER FUNCTION "user".login(cm json, b_skeep_mobile_auth boolean) OWNER TO cargochat_u;

--
-- Name: passw_recovery(json, text); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION passw_recovery(cm json, ipaddr text) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	tEmail text;
	tToken text;
	iSmsCodeIn integer;
	tPassw text;
	
	iUserId bigint;
	token_ttl bigint = 3600;
	tsSmstime timestamp without time zone;
	__phone__ text;
	iSmsCodeGen bigint;
	cooldown_ttl bigint = 60;
	cooldown_tail bigint = 0;
	smscode_old bigint;
	smscode_ttl bigint = 600;
	__code__ bigint;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	--RAISE LOG '-- user.passw_recovery --';
	
	tEmail := cm->>'email';
	tToken := cm->>'token';
	iSmsCodeIn := utils__text2bigint(cm->>'smscode');
	tPassw := cm->>'passw';
	IF tEmail IS NOT NULL AND utils__email_test(tEmail) IS NOT TRUE THEN RETURN error(-1, 'invalid email'); END IF;
	IF tPassw IS NOT NULL AND utils__passw_test(tPassw) IS NOT TRUE THEN RETURN error(-1, 'invalid passw'); END IF;
	IF tPassw IS NOT NULL THEN tPassw := md5(get_const('salt_passw') || tPassw); END IF;
	
	IF tToken IS NOT NULL THEN
		
		-- юзер указал токен
		
		SELECT "user_id" INTO iUserId FROM "user"."passw_recovery_token" WHERE "token" = tToken AND EXTRACT(EPOCH FROM utils__now_utc() - "ctime")::int <= token_ttl;
		IF NOT FOUND THEN RETURN error(-1, 'invalid token'); END IF;
		
		IF iSmsCodeIn IS NOT NULL AND tPassw IS NOT NULL THEN
			
			-- юзер указал все данные для смены пароля
			
			SELECT "smstime", "smscode" INTO tsSmstime, iSmsCodeGen FROM "public"."users" WHERE "id" = iUserId;
			IF NOT FOUND THEN RETURN error(-1, 'invalid user'); END IF;
			IF tsSmstime IS NULL OR iSmsCodeGen IS NULL OR iSmsCodeIn != iSmsCodeGen OR
				EXTRACT(EPOCH FROM utils__now_utc() - tsSmstime)::int > smscode_ttl THEN RETURN error(-1, 'invalid smscode'); END IF;
			DELETE FROM "user"."passw_recovery_token" WHERE "user_id" = iUserId;
			UPDATE "public"."users" SET "smstime" = NULL, "smscode" = NULL WHERE "id" = iUserId;
			UPDATE "public"."users_auths" SET "secret" = tPassw WHERE "user_id" = iUserId AND "type" = 'email_passw';
			RETURN json_build_object();  -- пароль изменен
			
		END IF;
		
		-- высылаем смскод
		
		SELECT "smstime", "mobile" INTO tsSmstime, __phone__ FROM "public"."users" WHERE "id" = iUserId;
		IF NOT FOUND THEN RETURN error(-1, 'invalid user'); END IF;
		cooldown_tail := cooldown_ttl - EXTRACT(EPOCH FROM utils__now_utc() - tsSmstime)::int;
		IF cooldown_tail > 0 THEN RETURN json_build_object('cooldown', cooldown_tail); END IF;  -- не высылаем, потому что кулдаун
		
		UPDATE "users" SET
			"smstime" = utils__now_utc(),
			"smscode" = floor(random()*899999)+100000
		WHERE "id" = iUserId
		RETURNING "smscode" INTO __code__;
		
		RETURN json_build_object(
			'cooldown', cooldown_ttl,
			'smscode_ttl', smscode_ttl,
			'__phone__', __phone__,
			'__code__', __code__
		);
		
	END IF;
	
	IF tEmail IS NOT NULL THEN
		
		-- юзер указал мыло
		-- высылаем ему токен
		
		SELECT "user_id" INTO iUserId FROM "users_auths" WHERE "type" = 'email_passw' AND LOWER("key") = LOWER(tEmail);
		IF NOT FOUND THEN RETURN error(-1, 'invalid email'); END IF;
		DELETE FROM "user"."passw_recovery_token" WHERE "user_id" = iUserId;
		INSERT INTO "user"."passw_recovery_token" ("user_id", "ipaddr") VALUES (iUserId, ipaddr) RETURNING "token" INTO tToken;
		RETURN json_build_object(
			'token_ttl', token_ttl,
			'__token__', tToken
		);
		
	END IF;
	
	RETURN error(-1, 'email required');
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'user.passw_recovery failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		IF SQLSTATE = '42883' THEN RETURN error(-1010, format('undefined cm(%s)', tCm)); END IF;  -- undefined_function
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION "user".passw_recovery(cm json, ipaddr text) OWNER TO cargochat_u;

--
-- Name: trigger_user_comp_id(); Type: FUNCTION; Schema: user; Owner: cargochat_u
--

CREATE FUNCTION trigger_user_comp_id() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	--RAISE LOG 'user.trigger_user_comp_id: TG_OP=% TG_WHEN=%', TG_OP, TG_WHEN;
	
	CASE (TG_WHEN)
		
		WHEN 'AFTER' THEN
			CASE (TG_OP)
				
				WHEN 'INSERT' THEN
					RAISE LOG 'user.trigger_user_comp_id: TG_OP=% TG_WHEN=% NEW=%', TG_OP, TG_WHEN, NEW;
					-- user.trigger_user_comp_id: TG_OP=INSERT TG_WHEN=AFTER NEW=(238,,,,,"2015-10-21 04:51:10.069728",,,,,,,,,221,34,0,,,,carrier)
					
					-- новый юзер
					
					IF NEW."comp_id" IS NOT NULL THEN
						
						-- создаем контакты
						INSERT INTO "user"."contacts" ("user_id", "contact_user_id")
						-- этого юзера со всеми юзерами компании в которой он появился
						SELECT NEW."id", "u"."id" FROM "public"."users" "u"
							WHERE
								"u"."id" != NEW."id"
									AND
								"u"."comp_id" = NEW."comp_id"
									AND
								NOT EXISTS (SELECT "contact_id" FROM "user"."contacts" WHERE "user_id" = NEW."id" AND "contact_user_id" = "u"."id")
						-- и у всех юзеров этой компании с этим юзером
						UNION
						SELECT "u"."id", NEW."id" FROM "public"."users" "u"
							WHERE
								"u"."id" != NEW."id"
									AND
								"u"."comp_id" = NEW."comp_id"
									AND
								NOT EXISTS (SELECT "contact_id" FROM "user"."contacts" WHERE "user_id" = "u"."id" AND "contact_user_id" = NEW."id");
						
						-- todo: use PostgreSQL 9.5 with INSERT ... ON CONFLICT DO NOTHING/UPDATE
						
					END IF;
					
					RETURN NEW;
					
				WHEN 'UPDATE' THEN
					--RAISE LOG 'user.trigger_user_comp_id: TG_OP=% TG_WHEN=% NEW=%', TG_OP, TG_WHEN, NEW;
					-- user.trigger_user_comp_id: TG_OP=DELETE TG_WHEN=AFTER OLD=(239,,,,,"2015-10-21 04:55:05.459847",,,,,,,,,221,34,0,,,,carrier)
					
					-- предположим что юзер не может менять компанию, тогда игнорим
					-- но если NEW."comp_id" изменится с NULL на NOT NULL, тогда нужна обработка, но пока тоже игнорим
					
					RETURN NEW;
					
				WHEN 'DELETE' THEN
					--RAISE LOG 'user.trigger_user_comp_id: TG_OP=% TG_WHEN=% OLD=%', TG_OP, TG_WHEN, OLD;
					-- user.trigger_user_comp_id: TG_OP=DELETE TG_WHEN=AFTER OLD=(238,,,,,"2015-10-21 04:51:10.069728",,,,,,,,,221,34,0,,,,carrier)
					
					-- контакты удалятся по fk
					
					RETURN OLD;
					
				ELSE
					RAISE EXCEPTION 'user.trigger_user_comp_id unhandled TG_OP';
				
			END CASE;
			
		ELSE
			RAISE EXCEPTION 'user.trigger_user_comp_id unhandled TG_WHEN';
		
	END CASE;
	
	RAISE EXCEPTION 'user.trigger_user_comp_id unexpected EOF';
	
EXCEPTION
	WHEN OTHERS THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'user.trigger_user_comp_id failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE;
END;
$$;


ALTER FUNCTION "user".trigger_user_comp_id() OWNER TO cargochat_u;

SET search_path = utils, pg_catalog;

--
-- Name: flgchk(bigint, bigint); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION flgchk(i_src bigint, i_flg bigint) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE COST 1
    AS $$
BEGIN
	RETURN (i_src & i_flg) = i_flg;
END
$$;


ALTER FUNCTION utils.flgchk(i_src bigint, i_flg bigint) OWNER TO cargochat_u;

--
-- Name: j2at(json); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION j2at(j_doc json) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT COST 10
    AS $$
DECLARE
	arr TEXT[] DEFAULT NULL;
BEGIN
	-- json to array of text
	BEGIN
		SELECT ARRAY_AGG(elem) INTO arr FROM json_array_elements_text(j_doc) elem;
	EXCEPTION WHEN OTHERS THEN
		RETURN NULL;
	END;
	RETURN arr;
END;
$$;


ALTER FUNCTION utils.j2at(j_doc json) OWNER TO cargochat_u;

--
-- Name: len(text[]); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION len(list text[]) RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
BEGIN
	--RETURN COALESCE(array_length(list, 1), 0);
	RETURN cardinality(list);
END;
$$;


ALTER FUNCTION utils.len(list text[]) OWNER TO cargochat_u;

--
-- Name: now_utc(); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION now_utc() RETURNS timestamp without time zone
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
BEGIN
  RETURN timezone('utc'::text, now());
END
$$;


ALTER FUNCTION utils.now_utc() OWNER TO cargochat_u;

--
-- Name: prepare_insert(json, json); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION prepare_insert(j_src json, j_schema json) RETURNS json
    LANGUAGE plpgsql IMMUTABLE STRICT COST 10
    AS $$
DECLARE
	
	aCols text[] = ARRAY[]::text[];
	aPars text[] = ARRAY[]::text[];
	aKeys text[];
	tKey text;
	
	dpNumber double precision;
	tMobileSrc text;
	tMobileNum text;
	dDate date;
	tsTime timestamp without time zone;
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	--RAISE LOG 'utils.prepare_insert';
	
	SELECT ARRAY_AGG(x) FROM json_object_keys(j_schema) x INTO aKeys;
	--RAISE LOG 'aKeys=%', aKeys;
	
	FOREACH tKey IN ARRAY aKeys LOOP
		--RAISE LOG 'tKey=% type=%', tKey, j_schema->>tKey;
		CONTINUE WHEN (j_src->tKey) IS NULL;
		CASE j_schema->tKey->>'type'
			WHEN 'text' THEN
				aCols := aCols || format('%I', j_schema->tKey->>'col');
				aPars := aPars || format('%L', j_src->>tKey);
			WHEN 'number' THEN
				dpNumber := "utils"."txt2float8"(j_src->>tKey);
				aCols := aCols || format('%I', j_schema->tKey->>'col');
				aPars := aPars || format('%L', dpNumber);
			WHEN 'date' THEN
				dDate := utils__text2date(j_src->>tKey);
				aCols := aCols || format('%I', j_schema->tKey->>'col');
				aPars := aPars || format('%L', dDate::text);
			WHEN 'ts' THEN
				tsTime := "utils"."txt2ts"(j_src->>tKey);
				aCols := aCols || format('%I', j_schema->tKey->>'col');
				aPars := aPars || format('%L', tsTime::text);
			WHEN 'mobile' THEN
				tMobileSrc := j_src->>tKey;
				IF (tMobileSrc IS NULL) THEN
					tMobileNum := NULL;
				ELSE
					SELECT array_to_string(ARRAY(SELECT SUBSTRING(regexp_matches(tMobileSrc, '(\d)', 'g')::text FROM 2 FOR 1)), '') INTO tMobileNum;
					CONTINUE WHEN (tMobileNum IS NULL) OR (length(tMobileNum) != 11);
				END IF;
				aCols := aCols || format('%I', j_schema->tKey->>'col');
				aPars := aPars || format('%L', tMobileNum);
			WHEN 'bool' THEN
				CONTINUE WHEN (json_typeof(j_src->tKey) != 'boolean');
				aCols := aCols || format('%I', j_schema->tKey->>'col');
				aPars := aPars || format('%L', (j_src->>tKey)::boolean);
			WHEN 'json' THEN
				aCols := aCols || format('%I', j_schema->tKey->>'col');
				aPars := aPars || format('%L', j_src->>tKey);
		ELSE
		END CASE;
	END LOOP;
	--RAISE LOG 'aCols: % %', aCols, array_to_string(aCols, ',');
	--RAISE LOG 'aPars: % %', aPars, array_to_string(aPars, ',');
	--RAISE LOG 'INSERT INTO <table> (%) VALUES (%)', array_to_string(aCols, ','), array_to_string(aPars, ',');
	
	RETURN json_build_array(aCols, aPars);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'utils.prepare_insert failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN NULL;
END;
$$;


ALTER FUNCTION utils.prepare_insert(j_src json, j_schema json) OWNER TO cargochat_u;

--
-- Name: prepare_list_filters(json, json); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION prepare_list_filters(cm json, j_cfg json) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT COST 10
    AS $$
DECLARE
	
	a_where TEXT[] = ARRAY[]::TEXT[];
	
	a_filters JSON[];
	j_filter JSON;
	t_col TEXT;
	t_op TEXT;
	t_cfilter TEXT;
	t_val TEXT;
	i_val BIGINT;
	f_val DOUBLE PRECISION;
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	BEGIN
		SELECT COALESCE(ARRAY_AGG(el), ARRAY[]::JSON[])
		INTO a_filters
		FROM json_array_elements(cm->'filters') el;
	EXCEPTION
		WHEN OTHERS THEN RETURN a_where;
	END;
	
	FOREACH j_filter IN ARRAY a_filters LOOP
		CONTINUE WHEN json_typeof(j_filter) != 'array' OR json_array_length(j_filter) != 3;
		t_col := j_filter->>0;
		t_op  := j_filter->>1;
		t_val := j_filter->>2;
		CONTINUE WHEN t_col IS NULL OR (j_cfg->'fields'->t_col) IS NULL OR t_val IS NULL;
		t_cfilter := j_cfg->'fields'->t_col->>'filter';
		CONTINUE WHEN t_col IS NULL;
		CASE j_cfg->'fields'->t_col->>'type'
			WHEN 'number' THEN
				f_val := "utils"."txt2float8"(t_val);
				CONTINUE WHEN f_val IS NULL;
				CASE t_op
					WHEN 'lt' THEN a_where := a_where || format('%s < %L', t_cfilter, f_val);
					WHEN 'gt' THEN a_where := a_where || format('%s > %L', t_cfilter, f_val);
					WHEN 'eq' THEN a_where := a_where || format('%s = %L', t_cfilter, f_val);
					ELSE CONTINUE;
				END CASE;
			WHEN 'timestamp' THEN
				i_val := "utils"."txt2int8"(t_val);
				CONTINUE WHEN i_val IS NULL;
				CASE t_op
					WHEN 'lt' THEN a_where := a_where || format('%s < %L', t_cfilter, i_val);
					WHEN 'gt' THEN a_where := a_where || format('%s > %L', t_cfilter, i_val);
					WHEN 'eq' THEN a_where := a_where || format('%s = %L', t_cfilter, i_val);
					ELSE CONTINUE;
				END CASE;
			WHEN 'text' THEN
				CASE t_op
					WHEN 'eq' THEN a_where := a_where || format('%s::TEXT = %L', t_cfilter, t_val);  -- todo: use `like`, check dots
					ELSE           a_where := a_where || format('%s::TEXT ~* E%L', t_cfilter, t_val);  -- todo: use `like`, check dots
				END CASE;
		ELSE
			CONTINUE;
		END CASE;
		
	END LOOP;
	
	RETURN a_where;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'utils.prepare_list_filters failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN NULL;
END;
$$;


ALTER FUNCTION utils.prepare_list_filters(cm json, j_cfg json) OWNER TO cargochat_u;

--
-- Name: prepare_list_selection(json, json); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION prepare_list_selection(cm json, j_cfg json) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT COST 10
    AS $$
DECLARE
	
	a_fields TEXT[];
	t_field TEXT;
	j_field JSON;
	a_selection TEXT[]  = ARRAY[]::TEXT[];
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	a_fields := "utils"."j2at"(cm->'fields');
	
	IF a_fields IS NOT NULL AND "utils"."len"(a_fields) > 0 THEN
		FOREACH t_field IN ARRAY a_fields LOOP
			j_field := j_cfg->'fields'->t_field;
			IF j_field IS NOT NULL THEN
				IF (j_field->>'alias') IS NULL THEN
					a_selection := a_selection || (j_field->>'select');
				ELSE
					a_selection := a_selection || format('%s %s', j_field->>'select', j_field->>'alias');
				END IF;
			END IF;
		END LOOP;
	END IF;
	
	IF "utils"."len"(a_selection) < 1 THEN
		j_field := j_cfg->'fields'->(j_cfg->>'default_field');
		IF (j_field->>'alias') IS NULL THEN
			a_selection := a_selection || (j_field->>'select');
		ELSE
			a_selection := a_selection || format('%s %s', j_field->>'select', j_field->>'alias');
		END IF;
	END IF;
	
	RETURN a_selection;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'utils.prepare_list_selection failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN NULL;
END;
$$;


ALTER FUNCTION utils.prepare_list_selection(cm json, j_cfg json) OWNER TO cargochat_u;

--
-- Name: prepare_update(json, json); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION prepare_update(j_src json, j_schema json) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE STRICT COST 10
    AS $$
DECLARE
	
	a_params TEXT[];
	a_keys TEXT[];
	t_key TEXT;
	
	f_number double precision;
	t_phone_src TEXT;
	t_phone_num TEXT;
	d_date DATE;
	ts_time TIMESTAMP WITHOUT TIME ZONE;
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	--RAISE LOG 'utils.prepare_update';
	
	a_params := ARRAY[]::TEXT[];
	
	SELECT ARRAY_AGG(x) FROM json_object_keys(j_schema) x INTO a_keys;
	--RAISE LOG 'a_keys=%', a_keys;
	
	FOREACH t_key IN ARRAY a_keys LOOP
		--RAISE LOG 't_key=% type=%', t_key, j_schema->>t_key;
		CONTINUE WHEN (j_src->t_key) IS NULL;
		CASE j_schema->t_key->>'type'
			WHEN 'text' THEN
				a_params := a_params || format('%I=%L', j_schema->t_key->>'col', j_src->>t_key);
			WHEN 'number' THEN
				f_number := "utils"."txt2float8"(j_src->>t_key);
				a_params := a_params || format('%I=%L', j_schema->t_key->>'col', f_number);
			WHEN 'date' THEN
				d_date := utils__text2date(j_src->>t_key);
				a_params := a_params || format('%I=%L', j_schema->t_key->>'col', d_date::TEXT);
			WHEN 'ts' THEN
				ts_time := "utils"."txt2ts"(j_src->>t_key);
				a_params := a_params || format('%I=%L', j_schema->t_key->>'col', ts_time::TEXT);
			WHEN 'mobile' THEN
				t_phone_src := j_src->>t_key;
				IF t_phone_src IS NULL THEN
					t_phone_num := NULL;
				ELSE
					SELECT array_to_string(ARRAY(SELECT SUBSTRING(regexp_matches(t_phone_src, '(\d)', 'g')::TEXT FROM 2 FOR 1)), '') INTO t_phone_num;
					CONTINUE WHEN t_phone_num IS NULL OR LENGTH(t_phone_num) != 11;
				END IF;
				a_params := a_params || format('%I=%L', j_schema->t_key->>'col', t_phone_num);
			WHEN 'bool' THEN
				CONTINUE WHEN (json_typeof(j_src->t_key) != 'boolean');
				a_params := a_params || format('%I=%L', j_schema->t_key->>'col', (j_src->>t_key)::BOOLEAN);
			WHEN 'json' THEN
				a_params := a_params || format('%I=%L', j_schema->t_key->>'col', j_src->>t_key);
		ELSE
		END CASE;
	END LOOP;
	--RAISE LOG 'a_params=%', a_params;
	--RAISE LOG 'a_params=%', array_to_string(a_params, ', ');
	
	RETURN a_params;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'utils.prepare_update failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN NULL;
END;
$$;


ALTER FUNCTION utils.prepare_update(j_src json, j_schema json) OWNER TO cargochat_u;

--
-- Name: txt2bool(text); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION txt2bool(val text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
DECLARE
	b_val BOOLEAN DEFAULT NULL;
BEGIN
	BEGIN
		b_val := val::BOOLEAN;
	EXCEPTION WHEN OTHERS THEN
		RETURN NULL;
	END;
	RETURN b_val;
END;
$$;


ALTER FUNCTION utils.txt2bool(val text) OWNER TO cargochat_u;

--
-- Name: txt2float8(text); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION txt2float8(val text) RETURNS double precision
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
DECLARE
	f_val DOUBLE PRECISION DEFAULT NULL;
BEGIN
	BEGIN
		f_val := val::DOUBLE PRECISION;
	EXCEPTION WHEN OTHERS THEN
		RETURN NULL;
	END;
	RETURN f_val;
END;
$$;


ALTER FUNCTION utils.txt2float8(val text) OWNER TO cargochat_u;

--
-- Name: txt2int4(text); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION txt2int4(val text) RETURNS integer
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
DECLARE
	i_val INTEGER DEFAULT NULL;
BEGIN
	BEGIN
		i_val := val::INTEGER;
	EXCEPTION WHEN OTHERS THEN
		RETURN NULL;
	END;
	RETURN i_val;
END;
$$;


ALTER FUNCTION utils.txt2int4(val text) OWNER TO cargochat_u;

--
-- Name: txt2int8(text); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION txt2int8(val text) RETURNS bigint
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
DECLARE
	i_val BIGINT DEFAULT NULL;
BEGIN
	BEGIN
		i_val := val::BIGINT;
	EXCEPTION WHEN OTHERS THEN
		RETURN NULL;
	END;
	RETURN i_val;
END;
$$;


ALTER FUNCTION utils.txt2int8(val text) OWNER TO cargochat_u;

--
-- Name: txt2ts(text); Type: FUNCTION; Schema: utils; Owner: cargochat_u
--

CREATE FUNCTION txt2ts(val text) RETURNS timestamp without time zone
    LANGUAGE plpgsql IMMUTABLE STRICT COST 1
    AS $$
DECLARE
	ts TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL;
BEGIN
	BEGIN
		ts := val::INTEGER::abstime::TIMESTAMP WITHOUT TIME ZONE;
	EXCEPTION WHEN OTHERS THEN
		--RAISE LOG 'Invalid timestamp value: "%"', val;
		RETURN NULL;
	END;
	RETURN ts;
END;
$$;


ALTER FUNCTION utils.txt2ts(val text) OWNER TO cargochat_u;

SET search_path = vehicle, pg_catalog;

--
-- Name: list(json, json); Type: FUNCTION; Schema: vehicle; Owner: cargochat_u
--

CREATE FUNCTION list(cl json, cm json) RETURNS json
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	i_target_comp_id BIGINT;
	
	a_selection TEXT[] = ARRAY[]::TEXT[];
	a_where TEXT[] = ARRAY[]::TEXT[];
	
	j_cfg JSON = '{
		"default_field": "id",
		"fields": {
			"id":        {"filter": "t.id",          "select": "t.id",                                           "type": "number"},
			"ctime":     {"filter": "t.ctime",       "select": "utils__ts2int(t.ctime)",  "alias": "ctime",      "type": "timestamp"},
			"model":     {"filter": "t.model",       "select": "t.model",                                        "type": "text"},
			"num":       {"filter": "t.num",         "select": "t.num",                                          "type": "text"},
			"type":      {"filter": "t.type",        "select": "t.type",                                         "type": "number"},
			"sts":       {"filter": "t.sts",         "select": "t.sts",                                          "type": "number"},
			"sts_name":  {"filter": "fs.sts_name",   "select": "fs.name",                 "alias": "sts_name",   "type": "text"},
			"sts_size":  {"filter": "fs.sts_size",   "select": "fs.size",                 "alias": "sts_size",   "type": "number"},
			"sts_token": {"filter": "fs.sts_token",  "select": "fs.token",                "alias": "sts_token",  "type": "text"},
			"pts":       {"filter": "t.pts",         "select": "t.pts",                                          "type": "number"},
			"pts_name":  {"filter": "fp.pts_name",   "select": "fp.name",                 "alias": "pts_name",   "type": "text"},
			"pts_size":  {"filter": "fp.pts_size",   "select": "fp.size",                 "alias": "pts_size",   "type": "number"},
			"pts_token": {"filter": "fp.pts_token",  "select": "fp.token",                "alias": "pts_token",  "type": "text"}
		}
	}';
	
	-- ordering, pagenation
	t_order_by TEXT;
	t_dir TEXT;
	i_offset BIGINT;
	i_limit BIGINT;
	i_xlimit BIGINT;
	
	-- fetching
	c1 REFCURSOR;
	r1 RECORD;
	i_total BIGINT;
	t_query TEXT;
	a_result JSON[] = ARRAY[]::JSON[];
	
	-- error handling
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'order.offers_list % %', cl, cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-1, 'invalid user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, format('user(%s) must have comp', i_user_id)); END IF;
	
	i_target_comp_id := "utils"."txt2int8"(cm->>'comp_id');
	IF i_target_comp_id IS NULL THEN RETURN error(-1, 'comp_id required'); END IF;
	
	t_order_by  := cm->>'orderBy';
	t_dir       := cm->>'dir';
	i_offset    := "utils"."txt2int8"(cm->>'offset');
	i_limit     := "utils"."txt2int8"(cm->>'limit');
	
	IF t_order_by IS NULL OR (j_cfg->'fields'->t_order_by) IS NULL THEN
		t_order_by = j_cfg->'fields'->(j_cfg->>'default_field')->>'select';
	ELSE
		t_order_by = j_cfg->'fields'->t_order_by->>'select';
	END IF;
	
	IF t_dir IS NULL OR NOT (t_dir = ANY(ARRAY['ASC','DESC'])) THEN t_dir := 'ASC'; END IF;
	IF i_offset IS NULL THEN i_offset = 0; END IF;
	IF i_limit IS NULL THEN i_limit = 50; ELSIF i_limit < 1 THEN i_limit = 1; ELSIF i_limit > 500 THEN i_limit = 500; END IF;
	i_xlimit := i_limit;
	
	a_selection := "utils"."prepare_list_selection"(cm, j_cfg);
	a_where := "utils"."prepare_list_filters"(cm, j_cfg);
	a_where := a_where || ('NOT "t"."deleted"'::TEXT);  -- не удаленные ТС
	a_where := a_where || format('"t"."comp_id" = %L', i_target_comp_id);  -- только ТС своей компании
	--IF "utils"."len"(a_where) < 1 THEN a_where := a_where || 'TRUE'::TEXT; END IF;
	
	t_query := format('
		SELECT %s
		FROM "vehicle"."vehicles_head" "t"
		LEFT JOIN "files" "fs" ON "fs"."id" = "t"."sts"
		LEFT JOIN "files" "fp" ON "fp"."id" = "t"."pts"
		WHERE (%s)
		ORDER BY %s %s',
		array_to_string(a_selection, ', '),
		array_to_string(a_where, ') AND ('),
		t_order_by, t_dir
	);
	
	RAISE LOG 't_query: %', t_query;
	
	OPEN c1 FOR EXECUTE t_query;
	MOVE FORWARD ALL IN c1;
	GET DIAGNOSTICS i_total = ROW_COUNT;
	RAISE LOG 'i_total=%', i_total;
	--MOVE FIRST IN c1;
	MOVE ABSOLUTE 0 IN c1;
	MOVE FORWARD i_offset IN c1;
	LOOP
		FETCH c1 INTO r1;
		IF NOT FOUND THEN EXIT; END IF;
		a_result := a_result || row_to_json(r1);
		IF i_xlimit <= 1 THEN EXIT; END IF;
		i_xlimit := i_xlimit - 1;
	END LOOP;
	CLOSE c1;
	
	RETURN json_build_object(
		'total',  i_total,
		'offset', i_offset,
		'limit',  i_limit,
		'uid',    i_user_id,
		'cid',    i_comp_id,
		'data',   array_to_json(a_result)
	);
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'order.offers_list failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION vehicle.list(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: manage(json, json); Type: FUNCTION; Schema: vehicle; Owner: cargochat_u
--

CREATE FUNCTION manage(cl json, cm json) RETURNS json
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
	
	i_user_id BIGINT;
	i_comp_id BIGINT;
	
	t_action TEXT;
	i_vehicle_id BIGINT;
	i_updated_vehicle_id BIGINT;
	
	t_model TEXT;
	t_num TEXT;
	t_type TEXT;
	t_sts_token TEXT;
	t_pts_token TEXT;
	
	i_sts_regular BIGINT;
	i_pts_regular BIGINT;
	
	a_upates TEXT[];
	t_sql TEXT;
	
	e_tbl TEXT;
	e_col TEXT;
	e_det TEXT;
	e_con TEXT;
	e_stk TEXT;
	
BEGIN
	
	RAISE LOG 'vehicle.manage %', cm;
	
	i_user_id := "utils"."txt2int8"(cl->>'user_id');
	i_comp_id := "utils"."txt2int8"(cl->>'comp_id');
	IF i_user_id IS NULL THEN RETURN error(-2000, 'invalid cl.user'); END IF;
	IF i_comp_id IS NULL THEN RETURN error(-1, format('user(%s) have no comp', i_user_id)); END IF;
	
	t_action    := cm->>'action';
	IF t_action IS NULL THEN RETURN error(-1, 'action required'); END IF;
	
	i_vehicle_id := "utils"."txt2int8"(cm->>'vehicle_id');
	t_model      := cm->>'model';  -- модель
	t_num        := cm->>'num';    -- госномер
	t_type       := cm->>'type';   -- марка
	t_sts_token  := cm->>'sts';
	t_pts_token  := cm->>'pts';
	
	CASE (t_action)
		
		WHEN 'create' THEN
			-- создание
			
			IF t_model IS NULL THEN RETURN error(-1, 'model required'); END IF;
			IF t_num IS NULL THEN RETURN error(-1, 'num required'); END IF;
			IF t_type IS NULL THEN RETURN error(-1, 'type required'); END IF;
			IF t_sts_token IS NULL THEN RETURN error(-1, 'sts required'); END IF;
			IF t_pts_token IS NULL THEN RETURN error(-1, 'pts required'); END IF;
			IF t_sts_token = t_pts_token THEN RETURN error(-1, 'sts and pts must be different'); END IF;
			
			SELECT "id" INTO i_sts_regular FROM "files" WHERE "token" = t_sts_token AND "temporary" IS TRUE;
			IF NOT FOUND THEN RETURN error(-1, format('temporary sts file(%s) not found', t_sts_token)); END IF;
			
			SELECT "id" INTO i_pts_regular FROM "files" WHERE "token" = t_pts_token AND "temporary" IS TRUE;
			IF NOT FOUND THEN RETURN error(-1, format('temporary pts file(%s) not found', t_pts_token)); END IF;
			
			-- делаем временные файлы постоянными
			UPDATE "files" SET "temporary" = FALSE WHERE "token" = t_sts_token;
			UPDATE "files" SET "temporary" = FALSE WHERE "token" = t_pts_token;
			
			-- создаем основной объект ТС
			INSERT INTO "vehicle"."vehicles_head" (
				"comp_id",
				"model",
				"num",
				"type",
				"sts",
				"pts"
			) VALUES (
				i_comp_id,
				t_model,
				t_num,
				t_type,
				i_sts_regular,
				i_pts_regular
			) RETURNING "id" INTO i_vehicle_id;
			
			-- создаем первую версию ТС
			INSERT INTO "vehicle"."vehicles_data" (
				"vehicle_id",
				"ctime",
				"model",
				"num",
				"type",
				"sts",
				"pts",
				"comp_id",
				"deleted",
				"dtime",
				"version"
			) SELECT
				"id",
				"ctime",  -- время создания версии = время создания основного объекта
				"model",
				"num",
				"type",
				"sts",
				"pts",
				"comp_id",
				"deleted",
				"dtime",
				"version"
			FROM "vehicle"."vehicles_head" WHERE "id" = i_vehicle_id;
			
			RETURN json_build_object(
				'vehicle_id', i_vehicle_id
			);
			
		WHEN 'update' THEN
			-- обновление
			
			a_upates := ARRAY[]::TEXT[];
			IF utils__json_key_exists(cm, 'model') THEN a_upates := a_upates || format('model = %L', t_model); END IF;
			IF utils__json_key_exists(cm, 'num')   THEN a_upates := a_upates || format('num = %L',   t_num); END IF;
			IF utils__json_key_exists(cm, 'type')  THEN a_upates := a_upates || format('type = %L',  t_type); END IF;
			
			IF utils__json_key_exists(cm, 'sts') THEN
				IF t_sts_token IS NOT NULL THEN
					SELECT "id" INTO i_sts_regular FROM "files" WHERE "token" = t_sts_token AND "temporary";
					IF NOT FOUND THEN RETURN error(-1, format('temporary sts file(%s) not found', t_sts_token)); END IF;
				ELSE
					a_upates := a_upates || ('sts = NULL')::TEXT;
				END IF;
			END IF;
			
			IF utils__json_key_exists(cm, 'pts') THEN
				IF t_pts_token IS NOT NULL THEN
					SELECT "id" INTO i_pts_regular FROM "files" WHERE "token" = t_pts_token AND "temporary";
					IF NOT FOUND THEN RETURN error(-1, format('temporary pts file(%s) not found', t_pts_token)); END IF;
				ELSE
					a_upates := a_upates || ('pts = NULL')::TEXT;
				END IF;
			END IF;
			
			IF i_sts_regular IS NOT NULL THEN
				-- делаем временный файл стс постоянным
				a_upates := a_upates || format('sts = %L',  i_sts_regular);
				UPDATE "files" SET "temporary" = FALSE WHERE "id" = i_sts_regular;
			END IF;
			
			IF i_pts_regular IS NOT NULL THEN
				-- делаем временный файл птс постоянным
				a_upates := a_upates || format('pts = %L',  i_pts_regular);
				UPDATE "files" SET "temporary" = FALSE WHERE "id" = i_pts_regular;
			END IF;
			
			--RAISE LOG 'a_upates=%', a_upates;
			
			IF "utils"."len"(a_upates) > 0 THEN  -- есть что обновлять
				
				a_upates := a_upates || ('"version" = "version" + 1'::TEXT);  -- инкрементим версию
				
				t_sql := format(
					'UPDATE "vehicle"."vehicles_head" SET %s WHERE "id" = %L AND "comp_id" = %L AND NOT "deleted" RETURNING "id"',
					array_to_string(a_upates, ','),
					i_vehicle_id,
					i_comp_id
				);
				--RAISE LOG 't_sql: %s', t_sql;
				EXECUTE t_sql INTO i_updated_vehicle_id;  -- вносим изменения в основой объект ТС
				IF i_updated_vehicle_id IS NULL THEN RETURN error(-1, format('vehicle(%s) and comp(%s) relation not found', i_vehicle_id, i_comp_id)); END IF;
				
				-- создаем очередную версию ТС
				INSERT INTO "vehicle"."vehicles_data" (
					"vehicle_id",
					"ctime",
					"model",
					"num",
					"type",
					"sts",
					"pts",
					"comp_id",
					"deleted",
					"dtime",
					"version"
				) SELECT
					"id",
					timezone('utc'::TEXT, NOW()),  -- время создания версии - время на момент обновления основного объекта
					"model",
					"num",
					"type",
					"sts",
					"pts",
					"comp_id",
					"deleted",
					"dtime",
					"version"
				FROM "vehicle"."vehicles_head" WHERE "id" = i_vehicle_id;
				
			END IF;
			
			RETURN json_build_object(
				'vehicle_id', i_vehicle_id
			);
			
		WHEN 'delete' THEN
			-- удаление
			
			SELECT "sts", "pts" INTO i_sts_regular, i_sts_regular FROM "vehicle"."vehicles_head" WHERE "id" = i_vehicle_id AND "comp_id" = i_comp_id AND NOT "deleted";
			IF NOT FOUND THEN RETURN error(-1, format('vehicle(%s) of comp(%s) not found', i_vehicle_id, i_comp_id)); END IF;
			
			-- помечаем ТС как удаленное
			UPDATE "vehicle"."vehicles_head" SET "deleted" = TRUE, "dtime" = "utils"."now_utc"() WHERE "id" = i_vehicle_id;
			
			-- создаем очередную версию ТС
			INSERT INTO "vehicle"."vehicles_data" (
				"vehicle_id",
				"ctime",
				"model",
				"num",
				"type",
				"sts",
				"pts",
				"comp_id",
				"deleted",
				"dtime",
				"version"
			) SELECT
				"id",
				timezone('utc'::TEXT, NOW()),  -- время создания версии - время на момент обновления основного объекта
				"model",
				"num",
				"type",
				"sts",
				"pts",
				"comp_id",
				"deleted",
				"dtime",
				"version"
			FROM "vehicle"."vehicles_head" WHERE "id" = i_vehicle_id;
			
			-- помечаем файлы ТС как удаленные
			IF i_sts_regular IS NOT NULL THEN UPDATE "files" SET "deleted" = TRUE WHERE "id" = i_sts_regular; END IF;
			IF i_sts_regular IS NOT NULL THEN UPDATE "files" SET "deleted" = TRUE WHERE "id" = i_sts_regular; END IF;
			
			RETURN json_build_object(
				'vehicle_id', i_vehicle_id
			);
			
		ELSE
			
			RETURN error(-1, format('unhandled action(%s)', t_action));
			
	END CASE;
	
	RETURN error(-1, 'unexpected EOF');
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS e_tbl = TABLE_NAME, e_col = COLUMN_NAME, e_det = PG_EXCEPTION_DETAIL, e_con = CONSTRAINT_NAME, e_stk = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RAISE LOG 'vehicle.manage failed: SQLSTATE=% SQLERRM="%" tbl="%" col="%" det="%" con=% stk="%"', SQLSTATE, SQLERRM, e_tbl, e_col, e_det, e_con, e_stk;
		RAISE LOG 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE';
		RETURN error(-2000, format('unhandled error %s', SQLSTATE));
END;
$$;


ALTER FUNCTION vehicle.manage(cl json, cm json) OWNER TO cargochat_u;

--
-- Name: trigger_vehicles_files_checker(); Type: FUNCTION; Schema: vehicle; Owner: cargochat_u
--

CREATE FUNCTION trigger_vehicles_files_checker() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
	
	eTable text;
	eCol text;
	eDetail text;
	eStack text;
	
BEGIN
	
	--RAISE LOG 'trigger_vehicles_files_checker: % % %', TG_WHEN, TG_OP, TG_RELNAME;
	--RAISE LOG 'OLD=% NEW=%', OLD, NEW;
	-- trigger_vehicles_files_checker: AFTER INSERT price_request_bets (17,"2015-08-26 03:12:05.644307",12,100,1,281)
	
	CASE (TG_OP)
		
		WHEN 'INSERT' THEN
			
			RETURN NEW;
			
		WHEN 'UPDATE' THEN
			
			--RAISE LOG 'UPDATE % != % = %, % != % = %', OLD.sts, NEW.sts, OLD.sts != NEW.sts, OLD.pts, NEW.pts, OLD.pts != NEW.pts;
			
			IF (OLD.sts IS NOT NULL) AND ((NEW.sts IS NULL) OR (OLD.sts != NEW.sts)) THEN
				UPDATE files SET deleted = TRUE WHERE (id = OLD.sts);
			END IF;
			
			IF (OLD.pts IS NOT NULL) AND ((NEW.pts IS NULL) OR (OLD.pts != NEW.pts)) THEN
				UPDATE files SET deleted = TRUE WHERE (id = OLD.pts);
			END IF;
			
			RETURN NEW;
			
		ELSE
			
			IF (OLD.sts IS NOT NULL) THEN
				UPDATE files SET deleted = TRUE WHERE (id = OLD.sts);
			END IF;
			
			IF (OLD.pts IS NOT NULL) THEN
				UPDATE files SET deleted = TRUE WHERE (id = OLD.pts);
			END IF;
			
			RETURN OLD;
			
	END CASE;
	
EXCEPTION
	WHEN others THEN
		GET STACKED DIAGNOSTICS eTable = TABLE_NAME, eCol = COLUMN_NAME, eDetail = PG_EXCEPTION_DETAIL, eStack = PG_EXCEPTION_CONTEXT;
		RAISE LOG 'trigger_vehicles_files_checker failed: SQLSTATE=% table="%" col="%" detail="%" SQLERRM="%", eStack="%"', SQLSTATE, eTable, eCol, eDetail, SQLERRM, eStack;
		--CASE (TG_OP)
		--	WHEN 'INSERT' THEN RETURN NEW;
		--	WHEN 'UPDATE' THEN RETURN OLD;
		--	ELSE RETURN OLD;
		--END CASE;
		RAISE;
END;
$$;


ALTER FUNCTION vehicle.trigger_vehicles_files_checker() OWNER TO cargochat_u;

SET search_path = _test, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: test1; Type: TABLE; Schema: _test; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE test1 (
    id bigint,
    t1 text,
    t2 text,
    t3 text
);


ALTER TABLE test1 OWNER TO cargochat_u;

--
-- Name: test2; Type: TABLE; Schema: _test; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE test2 (
    t text[],
    i bigint
);


ALTER TABLE test2 OWNER TO cargochat_u;

--
-- Name: test3; Type: TABLE; Schema: _test; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE test3 (
    iparams bigint[],
    cparams text[],
    id bigint NOT NULL,
    val1 bigint,
    val2 bigint,
    val3 bigint,
    val4 bigint,
    val5 bigint,
    val6 bigint,
    val7 bigint,
    val8 bigint,
    val9 bigint,
    val10 bigint,
    jparams jsonb
);


ALTER TABLE test3 OWNER TO cargochat_u;

--
-- Name: test3_id_seq; Type: SEQUENCE; Schema: _test; Owner: cargochat_u
--

CREATE SEQUENCE test3_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE test3_id_seq OWNER TO cargochat_u;

--
-- Name: test3_id_seq; Type: SEQUENCE OWNED BY; Schema: _test; Owner: cargochat_u
--

ALTER SEQUENCE test3_id_seq OWNED BY test3.id;


SET search_path = common, pg_catalog;

--
-- Name: commands; Type: TABLE; Schema: common; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE commands (
    cm_name character varying(1024) NOT NULL,
    iparams bigint[] NOT NULL,
    cparams character varying[] NOT NULL
);


ALTER TABLE commands OWNER TO cargochat_u;

SET search_path = comp, pg_catalog;

--
-- Name: invites; Type: TABLE; Schema: comp; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE invites (
    invite_id bigint NOT NULL,
    comp_id bigint,
    token text,
    last_name text,
    email text,
    phone text,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()),
    first_name text,
    pat_name text,
    smstime timestamp without time zone,
    smscode integer
);


ALTER TABLE invites OWNER TO cargochat_u;

--
-- Name: comp_invite_invite_id_seq; Type: SEQUENCE; Schema: comp; Owner: cargochat_u
--

CREATE SEQUENCE comp_invite_invite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comp_invite_invite_id_seq OWNER TO cargochat_u;

--
-- Name: comp_invite_invite_id_seq; Type: SEQUENCE OWNED BY; Schema: comp; Owner: cargochat_u
--

ALTER SEQUENCE comp_invite_invite_id_seq OWNED BY invites.invite_id;


SET search_path = lead, pg_catalog;

--
-- Name: registered; Type: TABLE; Schema: lead; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE registered (
    id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    ipaddr text,
    email text,
    phone text,
    name text,
    comp_id bigint,
    flags bigint
);


ALTER TABLE registered OWNER TO cargochat_u;

--
-- Name: registered_id_seq; Type: SEQUENCE; Schema: lead; Owner: cargochat_u
--

CREATE SEQUENCE registered_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE registered_id_seq OWNER TO cargochat_u;

--
-- Name: registered_id_seq; Type: SEQUENCE OWNED BY; Schema: lead; Owner: cargochat_u
--

ALTER SEQUENCE registered_id_seq OWNED BY registered.id;


SET search_path = lplace, pg_catalog;

--
-- Name: lplaces; Type: TABLE; Schema: lplace; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE lplaces (
    id bigint NOT NULL,
    name text,
    addr text,
    x double precision,
    y double precision,
    channel_id bigint,
    comp_id bigint,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()),
    flags bigint DEFAULT 0 NOT NULL,
    opened_orders_cnt bigint DEFAULT 0 NOT NULL
);


ALTER TABLE lplaces OWNER TO cargochat_u;

--
-- Name: COLUMN lplaces.comp_id; Type: COMMENT; Schema: lplace; Owner: cargochat_u
--

COMMENT ON COLUMN lplaces.comp_id IS 'создавшая компания';


--
-- Name: lpaces_id_seq; Type: SEQUENCE; Schema: lplace; Owner: cargochat_u
--

CREATE SEQUENCE lpaces_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE lpaces_id_seq OWNER TO cargochat_u;

--
-- Name: lpaces_id_seq; Type: SEQUENCE OWNED BY; Schema: lplace; Owner: cargochat_u
--

ALTER SEQUENCE lpaces_id_seq OWNED BY lplaces.id;


SET search_path = "order", pg_catalog;

--
-- Name: archive; Type: TABLE; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE archive (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    comp_id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now())
);


ALTER TABLE archive OWNER TO cargochat_u;

--
-- Name: archive_id_seq; Type: SEQUENCE; Schema: order; Owner: cargochat_u
--

CREATE SEQUENCE archive_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE archive_id_seq OWNER TO cargochat_u;

--
-- Name: archive_id_seq; Type: SEQUENCE OWNED BY; Schema: order; Owner: cargochat_u
--

ALTER SEQUENCE archive_id_seq OWNED BY archive.id;


--
-- Name: memo; Type: TABLE; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE memo (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    comp_id bigint NOT NULL,
    memo text
);


ALTER TABLE memo OWNER TO cargochat_u;

--
-- Name: memo_id_seq; Type: SEQUENCE; Schema: order; Owner: cargochat_u
--

CREATE SEQUENCE memo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE memo_id_seq OWNER TO cargochat_u;

--
-- Name: memo_id_seq; Type: SEQUENCE OWNED BY; Schema: order; Owner: cargochat_u
--

ALTER SEQUENCE memo_id_seq OWNED BY memo.id;


--
-- Name: offers; Type: TABLE; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE offers (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    carrier_comp_id bigint NOT NULL,
    vehicle_id bigint NOT NULL,
    driver bigint NOT NULL,
    cprice double precision,
    eprice double precision
);


ALTER TABLE offers OWNER TO cargochat_u;

--
-- Name: COLUMN offers.carrier_comp_id; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN offers.carrier_comp_id IS 'компания перевозчика';


--
-- Name: COLUMN offers.vehicle_id; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN offers.vehicle_id IS 'ТС перевозчика';


--
-- Name: COLUMN offers.driver; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN offers.driver IS 'id юзера-водителя';


--
-- Name: COLUMN offers.cprice; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN offers.cprice IS 'цена перевозчика';


--
-- Name: COLUMN offers.eprice; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN offers.eprice IS 'цена экспедитора';


--
-- Name: offers_id_seq; Type: SEQUENCE; Schema: order; Owner: cargochat_u
--

CREATE SEQUENCE offers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE offers_id_seq OWNER TO cargochat_u;

--
-- Name: offers_id_seq; Type: SEQUENCE OWNED BY; Schema: order; Owner: cargochat_u
--

ALTER SEQUENCE offers_id_seq OWNED BY offers.id;


--
-- Name: orders; Type: TABLE; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE orders (
    id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()),
    lplace_id bigint,
    ltype tp_load_type,
    mass double precision,
    vol double precision,
    vtype vehicle.tp_vehicle_type,
    ltime timestamp without time zone,
    utime timestamp without time zone,
    receiver text,
    uaddr text,
    ux double precision,
    uy double precision,
    comp_id bigint,
    note text,
    exp_comp_id bigint,
    cargo text,
    carrier_comp_id bigint,
    creason text,
    vehicle_id bigint,
    driver bigint,
    price double precision,
    shipper_comp_id bigint,
    open_ts timestamp without time zone,
    close_ts timestamp without time zone,
    cancel_ts timestamp without time zone,
    ship_ts timestamp without time zone,
    done_ts timestamp without time zone,
    state1 bigint NOT NULL,
    tname text,
    ecvehicle text,
    ectrailer text,
    ecdfio text,
    ecddoc text,
    vehicle_jdoc json,
    driver_jdoc json,
    CONSTRAINT orders_state1_check CHECK (((state1 >= 1) AND (state1 <= 7)))
);


ALTER TABLE orders OWNER TO cargochat_u;

--
-- Name: COLUMN orders.ctime; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.ctime IS 'время создания';


--
-- Name: COLUMN orders.mass; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.mass IS 'масса';


--
-- Name: COLUMN orders.vol; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.vol IS 'объем';


--
-- Name: COLUMN orders.vtype; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.vtype IS 'vehicle type';


--
-- Name: COLUMN orders.ltime; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.ltime IS 'load time';


--
-- Name: COLUMN orders.utime; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.utime IS 'unload time';


--
-- Name: COLUMN orders.uaddr; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.uaddr IS 'unload addr';


--
-- Name: COLUMN orders.ux; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.ux IS 'unload long';


--
-- Name: COLUMN orders.uy; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.uy IS 'unload lat';


--
-- Name: COLUMN orders.comp_id; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.comp_id IS 'company creator';


--
-- Name: COLUMN orders.exp_comp_id; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.exp_comp_id IS 'назначенный экспедитор';


--
-- Name: COLUMN orders.cargo; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.cargo IS 'наименование груза';


--
-- Name: COLUMN orders.creason; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.creason IS 'причина отмены';


--
-- Name: COLUMN orders.vehicle_id; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.vehicle_id IS 'выбранное ТС';


--
-- Name: COLUMN orders.driver; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.driver IS 'выбранный водитель';


--
-- Name: COLUMN orders.open_ts; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.open_ts IS 'время размещения';


--
-- Name: COLUMN orders.close_ts; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.close_ts IS 'время закрытия';


--
-- Name: COLUMN orders.cancel_ts; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.cancel_ts IS 'время отмены';


--
-- Name: COLUMN orders.ship_ts; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.ship_ts IS 'время перевозки';


--
-- Name: COLUMN orders.done_ts; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.done_ts IS 'время доставки';


--
-- Name: COLUMN orders.state1; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.state1 IS '1 - created
2 - opened
3 - shipping
4 - canceled
5 - done
6 - closed
7 - template';


--
-- Name: COLUMN orders.ecvehicle; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.ecvehicle IS 'данные ТС указанные экспедитором при закрытии вручную';


--
-- Name: COLUMN orders.ectrailer; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.ectrailer IS 'данные прицепа указанные экспедитором при закрытии вручную';


--
-- Name: COLUMN orders.ecdfio; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.ecdfio IS 'ФИО водителя указанные экспедитором при закрытии вручную';


--
-- Name: COLUMN orders.ecddoc; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.ecddoc IS 'документы водителя указанные экспедитором при закрытии вручную';


--
-- Name: COLUMN orders.vehicle_jdoc; Type: COMMENT; Schema: order; Owner: cargochat_u
--

COMMENT ON COLUMN orders.vehicle_jdoc IS 'состояние ТС на момент закрытия заказа';


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: order; Owner: cargochat_u
--

CREATE SEQUENCE orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE orders_id_seq OWNER TO cargochat_u;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: order; Owner: cargochat_u
--

ALTER SEQUENCE orders_id_seq OWNED BY orders.id;


SET search_path = price_req, pg_catalog;

--
-- Name: bets; Type: TABLE; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE bets (
    price_request_bet_id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    price_request_id bigint NOT NULL,
    bet double precision NOT NULL,
    flags bigint DEFAULT 0 NOT NULL,
    comp_id bigint NOT NULL,
    prc_comp_id bigint,
    user_id bigint
);


ALTER TABLE bets OWNER TO cargochat_u;

--
-- Name: COLUMN bets.comp_id; Type: COMMENT; Schema: price_req; Owner: cargochat_u
--

COMMENT ON COLUMN bets.comp_id IS 'компания создавшая ставку';


--
-- Name: COLUMN bets.prc_comp_id; Type: COMMENT; Schema: price_req; Owner: cargochat_u
--

COMMENT ON COLUMN bets.prc_comp_id IS 'компания создавшая запрос';


--
-- Name: COLUMN bets.user_id; Type: COMMENT; Schema: price_req; Owner: cargochat_u
--

COMMENT ON COLUMN bets.user_id IS 'юзер создавший ставку';


--
-- Name: bookmarks; Type: TABLE; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE bookmarks (
    price_request_bookmark_id bigint NOT NULL,
    price_request_id bigint NOT NULL,
    comp_id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now())
);


ALTER TABLE bookmarks OWNER TO cargochat_u;

--
-- Name: price_request_bets_price_request_bet_id_seq; Type: SEQUENCE; Schema: price_req; Owner: cargochat_u
--

CREATE SEQUENCE price_request_bets_price_request_bet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE price_request_bets_price_request_bet_id_seq OWNER TO cargochat_u;

--
-- Name: price_request_bets_price_request_bet_id_seq; Type: SEQUENCE OWNED BY; Schema: price_req; Owner: cargochat_u
--

ALTER SEQUENCE price_request_bets_price_request_bet_id_seq OWNED BY bets.price_request_bet_id;


--
-- Name: price_request_bookmarks_price_request_bookmark_id_seq; Type: SEQUENCE; Schema: price_req; Owner: cargochat_u
--

CREATE SEQUENCE price_request_bookmarks_price_request_bookmark_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE price_request_bookmarks_price_request_bookmark_id_seq OWNER TO cargochat_u;

--
-- Name: price_request_bookmarks_price_request_bookmark_id_seq; Type: SEQUENCE OWNED BY; Schema: price_req; Owner: cargochat_u
--

ALTER SEQUENCE price_request_bookmarks_price_request_bookmark_id_seq OWNED BY bookmarks.price_request_bookmark_id;


--
-- Name: received; Type: TABLE; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE received (
    price_request_received_id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    price_request_id bigint,
    comp_id bigint
);


ALTER TABLE received OWNER TO cargochat_u;

--
-- Name: price_request_received_price_request_received_id_seq; Type: SEQUENCE; Schema: price_req; Owner: cargochat_u
--

CREATE SEQUENCE price_request_received_price_request_received_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE price_request_received_price_request_received_id_seq OWNER TO cargochat_u;

--
-- Name: price_request_received_price_request_received_id_seq; Type: SEQUENCE OWNED BY; Schema: price_req; Owner: cargochat_u
--

ALTER SEQUENCE price_request_received_price_request_received_id_seq OWNED BY received.price_request_received_id;


--
-- Name: requests; Type: TABLE; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE requests (
    price_request_id bigint NOT NULL,
    comp_id bigint,
    shipment_time text,
    from_addr text,
    from_x double precision,
    from_y double precision,
    to_addr text,
    to_x double precision,
    to_y double precision,
    cargo_name text,
    volume double precision,
    mass double precision,
    unit text,
    note text,
    flags bigint DEFAULT 0 NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    bets bigint DEFAULT 0 NOT NULL,
    related_carriers_only boolean DEFAULT false NOT NULL
);


ALTER TABLE requests OWNER TO cargochat_u;

--
-- Name: price_requests_price_request_id_seq; Type: SEQUENCE; Schema: price_req; Owner: cargochat_u
--

CREATE SEQUENCE price_requests_price_request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE price_requests_price_request_id_seq OWNER TO cargochat_u;

--
-- Name: price_requests_price_request_id_seq; Type: SEQUENCE OWNED BY; Schema: price_req; Owner: cargochat_u
--

ALTER SEQUENCE price_requests_price_request_id_seq OWNED BY requests.price_request_id;


SET search_path = public, pg_catalog;

--
-- Name: comp_relation_requests; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE comp_relation_requests (
    comp_relation_request_id bigint NOT NULL,
    relation_type comp.tp_comp_relation_type NOT NULL,
    comp_from bigint NOT NULL,
    comp_to bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    comp_invite_id bigint,
    requested_comp_id bigint NOT NULL,
    requestor_comp_id bigint NOT NULL
);


ALTER TABLE comp_relation_requests OWNER TO cargochat_u;

--
-- Name: comp_relation_requests_comp_relation_request_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE comp_relation_requests_comp_relation_request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comp_relation_requests_comp_relation_request_id_seq OWNER TO cargochat_u;

--
-- Name: comp_relation_requests_comp_relation_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE comp_relation_requests_comp_relation_request_id_seq OWNED BY comp_relation_requests.comp_relation_request_id;


--
-- Name: comp_relations; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE comp_relations (
    relation_id bigint NOT NULL,
    relation_type comp.tp_comp_relation_type NOT NULL,
    comp_from bigint NOT NULL,
    comp_to bigint NOT NULL
);


ALTER TABLE comp_relations OWNER TO cargochat_u;

--
-- Name: comp_relations_relation_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE comp_relations_relation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comp_relations_relation_id_seq OWNER TO cargochat_u;

--
-- Name: comp_relations_relation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE comp_relations_relation_id_seq OWNED BY comp_relations.relation_id;


--
-- Name: comp_tags; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE comp_tags (
    comp_tag_id bigint NOT NULL,
    comp_id bigint NOT NULL,
    tag comp.tp_comp_tag NOT NULL
);


ALTER TABLE comp_tags OWNER TO cargochat_u;

--
-- Name: comp_tags_comp_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE comp_tags_comp_tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comp_tags_comp_tag_id_seq OWNER TO cargochat_u;

--
-- Name: comp_tags_comp_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE comp_tags_comp_tag_id_seq OWNED BY comp_tags.comp_tag_id;


--
-- Name: comps; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE comps (
    id bigint NOT NULL,
    inn text NOT NULL,
    ogrn text NOT NULL,
    kpp text,
    addr text,
    x double precision,
    y double precision,
    ymap jsonb,
    j_doc jsonb,
    name text,
    deleted boolean DEFAULT false NOT NULL,
    opf text,
    dadata jsonb,
    phone text,
    email text,
    web_site text,
    rel_trade_from comp.tp_comp_relation_option1 DEFAULT 'any'::comp.tp_comp_relation_option1 NOT NULL,
    rel_trade_to comp.tp_comp_relation_option1 DEFAULT 'any'::comp.tp_comp_relation_option1 NOT NULL,
    rel_transport_from comp.tp_comp_relation_option1 DEFAULT 'request'::comp.tp_comp_relation_option1 NOT NULL,
    rel_transport_to comp.tp_comp_relation_option1 DEFAULT 'request'::comp.tp_comp_relation_option1 NOT NULL,
    work_hours text,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    hard_tag_trade_from boolean DEFAULT false NOT NULL,
    state comp.tp_comp_state DEFAULT 'new'::comp.tp_comp_state NOT NULL,
    taxation comp.tp_comp_taxation,
    logo text,
    cnt_customers bigint DEFAULT 0,
    cnt_carriers bigint DEFAULT 0,
    cnt_vehicles bigint DEFAULT 0,
    info text
);


ALTER TABLE comps OWNER TO cargochat_u;

--
-- Name: COLUMN comps.cnt_customers; Type: COMMENT; Schema: public; Owner: cargochat_u
--

COMMENT ON COLUMN comps.cnt_customers IS 'кол-во заказчиков транспорта';


--
-- Name: COLUMN comps.cnt_carriers; Type: COMMENT; Schema: public; Owner: cargochat_u
--

COMMENT ON COLUMN comps.cnt_carriers IS 'кол-во перевозчиков';


--
-- Name: COLUMN comps.cnt_vehicles; Type: COMMENT; Schema: public; Owner: cargochat_u
--

COMMENT ON COLUMN comps.cnt_vehicles IS 'кол-во собственного ';


--
-- Name: comps_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE comps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comps_id_seq OWNER TO cargochat_u;

--
-- Name: comps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE comps_id_seq OWNED BY comps.id;


--
-- Name: const; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE const (
    key text NOT NULL,
    value text NOT NULL
);


ALTER TABLE const OWNER TO cargochat_u;

--
-- Name: dadata_opf; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE dadata_opf (
    code text NOT NULL,
    "full" text,
    short text
);


ALTER TABLE dadata_opf OWNER TO cargochat_u;

--
-- Name: event_docs; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE event_docs (
    event_doc_id bigint NOT NULL,
    received_cnt bigint DEFAULT 0 NOT NULL,
    ctime timestamp without time zone DEFAULT utils__now_utc() NOT NULL,
    type text NOT NULL,
    doc jsonb NOT NULL
);


ALTER TABLE event_docs OWNER TO cargochat_u;

--
-- Name: event_datas_event_data_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE event_datas_event_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE event_datas_event_data_id_seq OWNER TO cargochat_u;

--
-- Name: event_datas_event_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE event_datas_event_data_id_seq OWNED BY event_docs.event_doc_id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE events (
    event_id bigint NOT NULL,
    sid text,
    ctime timestamp without time zone DEFAULT utils__now_utc() NOT NULL,
    event_doc_id bigint NOT NULL
);


ALTER TABLE events OWNER TO cargochat_u;

--
-- Name: events_event_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE events_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE events_event_id_seq OWNER TO cargochat_u;

--
-- Name: events_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE events_event_id_seq OWNED BY events.event_id;


--
-- Name: public_file_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE public_file_id_seq
    START WITH 2000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public_file_id_seq OWNER TO cargochat_u;

--
-- Name: files; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE files (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    ctime time without time zone DEFAULT utils__now_utc() NOT NULL,
    temporary boolean DEFAULT false NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    token text DEFAULT bigint2ut(nextval('public_file_id_seq'::regclass)) NOT NULL,
    size bigint NOT NULL,
    name text NOT NULL
);


ALTER TABLE files OWNER TO cargochat_u;

--
-- Name: files_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE files_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE files_id_seq OWNER TO cargochat_u;

--
-- Name: files_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE files_id_seq OWNED BY files.id;


--
-- Name: files_regular_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE files_regular_id_seq
    START WITH 555
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE files_regular_id_seq OWNER TO cargochat_u;

--
-- Name: fs_temp_file_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE fs_temp_file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE fs_temp_file_id_seq OWNER TO cargochat_u;

--
-- Name: keys; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE keys (
    key text NOT NULL,
    user_id bigint,
    state text,
    ts timestamp without time zone DEFAULT now(),
    j_doc jsonb
);


ALTER TABLE keys OWNER TO cargochat_u;

--
-- Name: msg_channel_users; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE msg_channel_users (
    channel_id bigint NOT NULL,
    user_id bigint NOT NULL,
    lrm_id bigint,
    channel_user_id bigint NOT NULL,
    flags bigint DEFAULT 0 NOT NULL,
    unreaded bigint DEFAULT 0 NOT NULL
);


ALTER TABLE msg_channel_users OWNER TO cargochat_u;

--
-- Name: COLUMN msg_channel_users.lrm_id; Type: COMMENT; Schema: public; Owner: cargochat_u
--

COMMENT ON COLUMN msg_channel_users.lrm_id IS 'last readed message id';


--
-- Name: msg_channel_users_channel_user_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE msg_channel_users_channel_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE msg_channel_users_channel_user_id_seq OWNER TO cargochat_u;

--
-- Name: msg_channel_users_channel_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE msg_channel_users_channel_user_id_seq OWNED BY msg_channel_users.channel_user_id;


--
-- Name: msg_channels; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE msg_channels (
    channel_id bigint NOT NULL,
    title text,
    creator_user_id bigint,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    users bigint DEFAULT 0 NOT NULL,
    type channels.tp_ch_type NOT NULL
);


ALTER TABLE msg_channels OWNER TO cargochat_u;

--
-- Name: COLUMN msg_channels.users; Type: COMMENT; Schema: public; Owner: cargochat_u
--

COMMENT ON COLUMN msg_channels.users IS 'кол-во юзеров';


--
-- Name: msg_channels_channel_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE msg_channels_channel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE msg_channels_channel_id_seq OWNER TO cargochat_u;

--
-- Name: msg_channels_channel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE msg_channels_channel_id_seq OWNED BY msg_channels.channel_id;


--
-- Name: msg_channels_hist; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE msg_channels_hist (
    message_id bigint NOT NULL,
    user_id bigint NOT NULL,
    channel_id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    message_body text,
    deleted boolean DEFAULT false NOT NULL
);


ALTER TABLE msg_channels_hist OWNER TO cargochat_u;

--
-- Name: msg_hist_channels_message_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE msg_hist_channels_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE msg_hist_channels_message_id_seq OWNER TO cargochat_u;

--
-- Name: msg_hist_channels_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE msg_hist_channels_message_id_seq OWNED BY msg_channels_hist.message_id;


--
-- Name: msg_private_hist; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE msg_private_hist (
    message_id bigint NOT NULL,
    user_id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    message_body text,
    private_id bigint NOT NULL
);


ALTER TABLE msg_private_hist OWNER TO cargochat_u;

--
-- Name: msg_hist_private_message_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE msg_hist_private_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE msg_hist_private_message_id_seq OWNER TO cargochat_u;

--
-- Name: msg_hist_private_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE msg_hist_private_message_id_seq OWNED BY msg_private_hist.message_id;


--
-- Name: msg_privates; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE msg_privates (
    private_id bigint NOT NULL,
    user1_id bigint NOT NULL,
    user1_unreaded bigint DEFAULT 0 NOT NULL,
    user1_lrm_id bigint,
    user2_id bigint NOT NULL,
    user2_unreaded bigint DEFAULT 0 NOT NULL,
    user2_lrm_id bigint,
    ctime timestamp without time zone DEFAULT utils__now_utc() NOT NULL,
    user1_lrm_ts timestamp without time zone,
    user2_lrm_ts timestamp without time zone,
    CONSTRAINT msg_privates_check CHECK ((user1_id < user2_id))
);


ALTER TABLE msg_privates OWNER TO cargochat_u;

--
-- Name: msg_privates_private_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE msg_privates_private_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE msg_privates_private_id_seq OWNER TO cargochat_u;

--
-- Name: msg_privates_private_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE msg_privates_private_id_seq OWNED BY msg_privates.private_id;


--
-- Name: perm_types; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE perm_types (
    type bigint NOT NULL,
    alias text NOT NULL,
    name text
);


ALTER TABLE perm_types OWNER TO cargochat_u;

--
-- Name: perms; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE perms (
    user_id bigint NOT NULL,
    comp_id bigint NOT NULL,
    perm_type bigint NOT NULL,
    perm_id bigint NOT NULL
);


ALTER TABLE perms OWNER TO cargochat_u;

--
-- Name: perms_perm_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE perms_perm_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE perms_perm_id_seq OWNER TO cargochat_u;

--
-- Name: perms_perm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE perms_perm_id_seq OWNED BY perms.perm_id;


--
-- Name: rt_comp_tender; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE rt_comp_tender (
    comp_id bigint NOT NULL,
    tender_id bigint NOT NULL
);


ALTER TABLE rt_comp_tender OWNER TO cargochat_u;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE sessions (
    sid text NOT NULL,
    user_id bigint,
    ctime timestamp without time zone DEFAULT utils__now_utc() NOT NULL,
    mtime timestamp without time zone DEFAULT utils__now_utc() NOT NULL,
    updated bigint DEFAULT 0 NOT NULL,
    ip text,
    id bigint NOT NULL
);


ALTER TABLE sessions OWNER TO cargochat_u;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sessions_id_seq OWNER TO cargochat_u;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE sessions_id_seq OWNED BY sessions.id;


--
-- Name: tender_invite_states; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE tender_invite_states (
    id bigint NOT NULL,
    name text
);


ALTER TABLE tender_invite_states OWNER TO cargochat_u;

--
-- Name: tender_invites; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE tender_invites (
    id bigint NOT NULL,
    tender_id bigint,
    comp_id bigint,
    state bigint
);


ALTER TABLE tender_invites OWNER TO cargochat_u;

--
-- Name: tender_invites_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE tender_invites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tender_invites_id_seq OWNER TO cargochat_u;

--
-- Name: tender_invites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE tender_invites_id_seq OWNED BY tender_invites.id;


--
-- Name: tender_join_requests; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE tender_join_requests (
    id bigint NOT NULL,
    tender_id bigint,
    comp_id bigint,
    state bigint
);


ALTER TABLE tender_join_requests OWNER TO cargochat_u;

--
-- Name: tender_joi_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE tender_joi_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tender_joi_requests_id_seq OWNER TO cargochat_u;

--
-- Name: tender_joi_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE tender_joi_requests_id_seq OWNED BY tender_join_requests.id;


--
-- Name: tender_join_request_states; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE tender_join_request_states (
    id bigint NOT NULL,
    name text
);


ALTER TABLE tender_join_request_states OWNER TO cargochat_u;

--
-- Name: tenders; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE tenders (
    id bigint NOT NULL,
    name text,
    ctime timestamp without time zone,
    stime timestamp without time zone,
    etime timestamp without time zone,
    organizer text,
    requests text,
    j_doc jsonb,
    owner_comp_id bigint
);


ALTER TABLE tenders OWNER TO cargochat_u;

--
-- Name: tenders_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE tenders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tenders_id_seq OWNER TO cargochat_u;

--
-- Name: tenders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE tenders_id_seq OWNED BY tenders.id;


--
-- Name: user_perm; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE user_perm (
    user_id bigint NOT NULL,
    perm_type bigint NOT NULL
);


ALTER TABLE user_perm OWNER TO cargochat_u;

--
-- Name: user_perm_type; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE user_perm_type (
    perm_type bigint NOT NULL,
    alias text,
    descr text
);


ALTER TABLE user_perm_type OWNER TO cargochat_u;

--
-- Name: users; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE users (
    id bigint NOT NULL,
    first_name text,
    last_name text,
    pat_name text,
    icq text,
    reg_ts timestamp without time zone DEFAULT timezone('utc'::text, now()),
    act_ts timestamp without time zone,
    login_ts timestamp without time zone,
    j_doc jsonb,
    mobile text,
    skype text,
    email text,
    gender text,
    birthday date,
    comp_id bigint,
    flags bigint DEFAULT (2 | 32) NOT NULL,
    comp_flags bigint DEFAULT 0 NOT NULL,
    "position" text,
    smstime timestamp without time zone,
    smscode integer,
    workspace "user".tp_workspace DEFAULT 'carrier'::"user".tp_workspace
);


ALTER TABLE users OWNER TO cargochat_u;

--
-- Name: users_auths; Type: TABLE; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE users_auths (
    user_id bigint NOT NULL,
    type text NOT NULL,
    key text,
    secret text,
    j_doc jsonb
);


ALTER TABLE users_auths OWNER TO cargochat_u;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: cargochat_u
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO cargochat_u;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cargochat_u
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


SET search_path = "user", pg_catalog;

--
-- Name: contacts; Type: TABLE; Schema: user; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE contacts (
    contact_id bigint NOT NULL,
    user_id bigint,
    contact_user_id bigint,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now())
);


ALTER TABLE contacts OWNER TO cargochat_u;

--
-- Name: invites; Type: TABLE; Schema: user; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE invites (
    user_invite_id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    email text NOT NULL,
    comp_id bigint NOT NULL,
    token text NOT NULL,
    "position" text,
    first_name text,
    pat_name text,
    last_name text,
    phone text,
    smstime timestamp without time zone,
    smscode integer
);


ALTER TABLE invites OWNER TO cargochat_u;

--
-- Name: passw_recovery_token; Type: TABLE; Schema: user; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE passw_recovery_token (
    id bigint NOT NULL,
    ctime timestamp without time zone DEFAULT timezone('utc'::text, now()),
    user_id bigint,
    token text DEFAULT public.bigint2ut(nextval('public.public_file_id_seq'::regclass)) NOT NULL,
    ipaddr text
);


ALTER TABLE passw_recovery_token OWNER TO cargochat_u;

--
-- Name: passw_reocovery_id_seq; Type: SEQUENCE; Schema: user; Owner: cargochat_u
--

CREATE SEQUENCE passw_reocovery_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE passw_reocovery_id_seq OWNER TO cargochat_u;

--
-- Name: passw_reocovery_id_seq; Type: SEQUENCE OWNED BY; Schema: user; Owner: cargochat_u
--

ALTER SEQUENCE passw_reocovery_id_seq OWNED BY passw_recovery_token.id;


--
-- Name: user_contacts_contact_id_seq; Type: SEQUENCE; Schema: user; Owner: cargochat_u
--

CREATE SEQUENCE user_contacts_contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_contacts_contact_id_seq OWNER TO cargochat_u;

--
-- Name: user_contacts_contact_id_seq; Type: SEQUENCE OWNED BY; Schema: user; Owner: cargochat_u
--

ALTER SEQUENCE user_contacts_contact_id_seq OWNED BY contacts.contact_id;


--
-- Name: user_invites_user_invite_id_seq; Type: SEQUENCE; Schema: user; Owner: cargochat_u
--

CREATE SEQUENCE user_invites_user_invite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_invites_user_invite_id_seq OWNER TO cargochat_u;

--
-- Name: user_invites_user_invite_id_seq; Type: SEQUENCE OWNED BY; Schema: user; Owner: cargochat_u
--

ALTER SEQUENCE user_invites_user_invite_id_seq OWNED BY invites.user_invite_id;


SET search_path = vehicle, pg_catalog;

--
-- Name: vehicles_data; Type: TABLE; Schema: vehicle; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE vehicles_data (
    id bigint NOT NULL,
    vehicle_id bigint NOT NULL,
    ctime timestamp(6) without time zone NOT NULL,
    model text,
    num text,
    type text,
    sts bigint,
    pts bigint,
    comp_id bigint NOT NULL,
    version bigint DEFAULT 0 NOT NULL,
    deleted boolean,
    dtime timestamp without time zone
);


ALTER TABLE vehicles_data OWNER TO cargochat_u;

--
-- Name: vehicles_data_id_seq; Type: SEQUENCE; Schema: vehicle; Owner: cargochat_u
--

CREATE SEQUENCE vehicles_data_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vehicles_data_id_seq OWNER TO cargochat_u;

--
-- Name: vehicles_data_id_seq; Type: SEQUENCE OWNED BY; Schema: vehicle; Owner: cargochat_u
--

ALTER SEQUENCE vehicles_data_id_seq OWNED BY vehicles_data.id;


--
-- Name: vehicles_head; Type: TABLE; Schema: vehicle; Owner: cargochat_u; Tablespace: 
--

CREATE TABLE vehicles_head (
    id bigint NOT NULL,
    ctime timestamp(6) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    model text,
    num text,
    type text,
    sts bigint,
    pts bigint,
    comp_id bigint NOT NULL,
    version bigint DEFAULT 0 NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    dtime timestamp without time zone
);


ALTER TABLE vehicles_head OWNER TO cargochat_u;

--
-- Name: COLUMN vehicles_head.ctime; Type: COMMENT; Schema: vehicle; Owner: cargochat_u
--

COMMENT ON COLUMN vehicles_head.ctime IS 'время создания';


--
-- Name: COLUMN vehicles_head.dtime; Type: COMMENT; Schema: vehicle; Owner: cargochat_u
--

COMMENT ON COLUMN vehicles_head.dtime IS 'время удаления';


--
-- Name: vehicles_head_id_seq; Type: SEQUENCE; Schema: vehicle; Owner: cargochat_u
--

CREATE SEQUENCE vehicles_head_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vehicles_head_id_seq OWNER TO cargochat_u;

--
-- Name: vehicles_head_id_seq; Type: SEQUENCE OWNED BY; Schema: vehicle; Owner: cargochat_u
--

ALTER SEQUENCE vehicles_head_id_seq OWNED BY vehicles_head.id;


SET search_path = _test, pg_catalog;

--
-- Name: id; Type: DEFAULT; Schema: _test; Owner: cargochat_u
--

ALTER TABLE ONLY test3 ALTER COLUMN id SET DEFAULT nextval('test3_id_seq'::regclass);


SET search_path = comp, pg_catalog;

--
-- Name: invite_id; Type: DEFAULT; Schema: comp; Owner: cargochat_u
--

ALTER TABLE ONLY invites ALTER COLUMN invite_id SET DEFAULT nextval('comp_invite_invite_id_seq'::regclass);


SET search_path = lead, pg_catalog;

--
-- Name: id; Type: DEFAULT; Schema: lead; Owner: cargochat_u
--

ALTER TABLE ONLY registered ALTER COLUMN id SET DEFAULT nextval('registered_id_seq'::regclass);


SET search_path = lplace, pg_catalog;

--
-- Name: id; Type: DEFAULT; Schema: lplace; Owner: cargochat_u
--

ALTER TABLE ONLY lplaces ALTER COLUMN id SET DEFAULT nextval('lpaces_id_seq'::regclass);


SET search_path = "order", pg_catalog;

--
-- Name: id; Type: DEFAULT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY archive ALTER COLUMN id SET DEFAULT nextval('archive_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY memo ALTER COLUMN id SET DEFAULT nextval('memo_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY offers ALTER COLUMN id SET DEFAULT nextval('offers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY orders ALTER COLUMN id SET DEFAULT nextval('orders_id_seq'::regclass);


SET search_path = price_req, pg_catalog;

--
-- Name: price_request_bet_id; Type: DEFAULT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY bets ALTER COLUMN price_request_bet_id SET DEFAULT nextval('price_request_bets_price_request_bet_id_seq'::regclass);


--
-- Name: price_request_bookmark_id; Type: DEFAULT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY bookmarks ALTER COLUMN price_request_bookmark_id SET DEFAULT nextval('price_request_bookmarks_price_request_bookmark_id_seq'::regclass);


--
-- Name: price_request_received_id; Type: DEFAULT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY received ALTER COLUMN price_request_received_id SET DEFAULT nextval('price_request_received_price_request_received_id_seq'::regclass);


--
-- Name: price_request_id; Type: DEFAULT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY requests ALTER COLUMN price_request_id SET DEFAULT nextval('price_requests_price_request_id_seq'::regclass);


SET search_path = public, pg_catalog;

--
-- Name: comp_relation_request_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_relation_requests ALTER COLUMN comp_relation_request_id SET DEFAULT nextval('comp_relation_requests_comp_relation_request_id_seq'::regclass);


--
-- Name: relation_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_relations ALTER COLUMN relation_id SET DEFAULT nextval('comp_relations_relation_id_seq'::regclass);


--
-- Name: comp_tag_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_tags ALTER COLUMN comp_tag_id SET DEFAULT nextval('comp_tags_comp_tag_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comps ALTER COLUMN id SET DEFAULT nextval('comps_id_seq'::regclass);


--
-- Name: event_doc_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY event_docs ALTER COLUMN event_doc_id SET DEFAULT nextval('event_datas_event_data_id_seq'::regclass);


--
-- Name: event_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY events ALTER COLUMN event_id SET DEFAULT nextval('events_event_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY files ALTER COLUMN id SET DEFAULT nextval('files_id_seq'::regclass);


--
-- Name: channel_user_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_channel_users ALTER COLUMN channel_user_id SET DEFAULT nextval('msg_channel_users_channel_user_id_seq'::regclass);


--
-- Name: channel_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_channels ALTER COLUMN channel_id SET DEFAULT nextval('msg_channels_channel_id_seq'::regclass);


--
-- Name: message_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_channels_hist ALTER COLUMN message_id SET DEFAULT nextval('msg_hist_channels_message_id_seq'::regclass);


--
-- Name: message_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_private_hist ALTER COLUMN message_id SET DEFAULT nextval('msg_hist_private_message_id_seq'::regclass);


--
-- Name: private_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_privates ALTER COLUMN private_id SET DEFAULT nextval('msg_privates_private_id_seq'::regclass);


--
-- Name: perm_id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY perms ALTER COLUMN perm_id SET DEFAULT nextval('perms_perm_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY sessions ALTER COLUMN id SET DEFAULT nextval('sessions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tender_invites ALTER COLUMN id SET DEFAULT nextval('tender_invites_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tender_join_requests ALTER COLUMN id SET DEFAULT nextval('tender_joi_requests_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tenders ALTER COLUMN id SET DEFAULT nextval('tenders_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


SET search_path = "user", pg_catalog;

--
-- Name: contact_id; Type: DEFAULT; Schema: user; Owner: cargochat_u
--

ALTER TABLE ONLY contacts ALTER COLUMN contact_id SET DEFAULT nextval('user_contacts_contact_id_seq'::regclass);


--
-- Name: user_invite_id; Type: DEFAULT; Schema: user; Owner: cargochat_u
--

ALTER TABLE ONLY invites ALTER COLUMN user_invite_id SET DEFAULT nextval('user_invites_user_invite_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: user; Owner: cargochat_u
--

ALTER TABLE ONLY passw_recovery_token ALTER COLUMN id SET DEFAULT nextval('passw_reocovery_id_seq'::regclass);


SET search_path = vehicle, pg_catalog;

--
-- Name: id; Type: DEFAULT; Schema: vehicle; Owner: cargochat_u
--

ALTER TABLE ONLY vehicles_data ALTER COLUMN id SET DEFAULT nextval('vehicles_data_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: vehicle; Owner: cargochat_u
--

ALTER TABLE ONLY vehicles_head ALTER COLUMN id SET DEFAULT nextval('vehicles_head_id_seq'::regclass);


SET search_path = _test, pg_catalog;

--
-- Name: test3_pkey; Type: CONSTRAINT; Schema: _test; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY test3
    ADD CONSTRAINT test3_pkey PRIMARY KEY (id);


SET search_path = common, pg_catalog;

--
-- Name: commands_pk; Type: CONSTRAINT; Schema: common; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY commands
    ADD CONSTRAINT commands_pk PRIMARY KEY (cm_name);


SET search_path = comp, pg_catalog;

--
-- Name: comp_invite_pkey; Type: CONSTRAINT; Schema: comp; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY invites
    ADD CONSTRAINT comp_invite_pkey PRIMARY KEY (invite_id);


--
-- Name: comp_invite_token_key; Type: CONSTRAINT; Schema: comp; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY invites
    ADD CONSTRAINT comp_invite_token_key UNIQUE (token);


SET search_path = lead, pg_catalog;

--
-- Name: registered_pkey; Type: CONSTRAINT; Schema: lead; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY registered
    ADD CONSTRAINT registered_pkey PRIMARY KEY (id);


SET search_path = lplace, pg_catalog;

--
-- Name: lpaces_pkey; Type: CONSTRAINT; Schema: lplace; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY lplaces
    ADD CONSTRAINT lpaces_pkey PRIMARY KEY (id);


SET search_path = "order", pg_catalog;

--
-- Name: archive_pkey; Type: CONSTRAINT; Schema: order; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY archive
    ADD CONSTRAINT archive_pkey PRIMARY KEY (id);


--
-- Name: memo_pkey; Type: CONSTRAINT; Schema: order; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY memo
    ADD CONSTRAINT memo_pkey PRIMARY KEY (id);


--
-- Name: offers_pkey; Type: CONSTRAINT; Schema: order; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (id);


--
-- Name: orders_pkey; Type: CONSTRAINT; Schema: order; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


SET search_path = price_req, pg_catalog;

--
-- Name: price_request_bets_pkey; Type: CONSTRAINT; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY bets
    ADD CONSTRAINT price_request_bets_pkey PRIMARY KEY (price_request_bet_id);


--
-- Name: price_request_bookmarks_pkey; Type: CONSTRAINT; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY bookmarks
    ADD CONSTRAINT price_request_bookmarks_pkey PRIMARY KEY (price_request_bookmark_id);


--
-- Name: price_request_received_pkey; Type: CONSTRAINT; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY received
    ADD CONSTRAINT price_request_received_pkey PRIMARY KEY (price_request_received_id);


--
-- Name: price_requests_pkey; Type: CONSTRAINT; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY requests
    ADD CONSTRAINT price_requests_pkey PRIMARY KEY (price_request_id);


SET search_path = public, pg_catalog;

--
-- Name: comp_relation_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY comp_relation_requests
    ADD CONSTRAINT comp_relation_requests_pkey PRIMARY KEY (comp_relation_request_id);


--
-- Name: comp_relation_requests_relation_type_comp_from_comp_to_key; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY comp_relation_requests
    ADD CONSTRAINT comp_relation_requests_relation_type_comp_from_comp_to_key UNIQUE (relation_type, comp_from, comp_to);


--
-- Name: comp_relations_comp_to_key; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY comp_relations
    ADD CONSTRAINT comp_relations_comp_to_key UNIQUE (comp_to, relation_type, comp_from);


--
-- Name: comp_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY comp_relations
    ADD CONSTRAINT comp_relations_pkey PRIMARY KEY (relation_id);


--
-- Name: comp_tags_comp_id_tag_key; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY comp_tags
    ADD CONSTRAINT comp_tags_comp_id_tag_key UNIQUE (comp_id, tag);


--
-- Name: comp_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY comp_tags
    ADD CONSTRAINT comp_tags_pkey PRIMARY KEY (comp_tag_id);


--
-- Name: comps_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY comps
    ADD CONSTRAINT comps_pkey PRIMARY KEY (id);


--
-- Name: const_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY const
    ADD CONSTRAINT const_pkey PRIMARY KEY (key);


--
-- Name: dadata_opf_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY dadata_opf
    ADD CONSTRAINT dadata_opf_pkey PRIMARY KEY (code);


--
-- Name: event_docs_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY event_docs
    ADD CONSTRAINT event_docs_pkey PRIMARY KEY (event_doc_id);


--
-- Name: events_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- Name: files_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);


--
-- Name: keys_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY keys
    ADD CONSTRAINT keys_pkey PRIMARY KEY (key);


--
-- Name: msg_channel_users_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY msg_channel_users
    ADD CONSTRAINT msg_channel_users_pkey PRIMARY KEY (channel_user_id);


--
-- Name: msg_channels_hist_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY msg_channels_hist
    ADD CONSTRAINT msg_channels_hist_pkey PRIMARY KEY (message_id);


--
-- Name: msg_channels_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY msg_channels
    ADD CONSTRAINT msg_channels_pkey PRIMARY KEY (channel_id);


--
-- Name: msg_private_hist_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY msg_private_hist
    ADD CONSTRAINT msg_private_hist_pkey PRIMARY KEY (message_id);


--
-- Name: msg_privates_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY msg_privates
    ADD CONSTRAINT msg_privates_pkey PRIMARY KEY (private_id);


--
-- Name: perm_types_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY perm_types
    ADD CONSTRAINT perm_types_pkey PRIMARY KEY (type);


--
-- Name: perms_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY perms
    ADD CONSTRAINT perms_pkey PRIMARY KEY (perm_id);


--
-- Name: perms_user_id_comp_id_perm_type_key; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY perms
    ADD CONSTRAINT perms_user_id_comp_id_perm_type_key UNIQUE (user_id, comp_id, perm_type);


--
-- Name: rt_comp_tender_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY rt_comp_tender
    ADD CONSTRAINT rt_comp_tender_pkey PRIMARY KEY (comp_id, tender_id);


--
-- Name: sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: tender_invite_states_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY tender_invite_states
    ADD CONSTRAINT tender_invite_states_pkey PRIMARY KEY (id);


--
-- Name: tender_invites_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY tender_invites
    ADD CONSTRAINT tender_invites_pkey PRIMARY KEY (id);


--
-- Name: tender_invites_tender_id_comp_id_key; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY tender_invites
    ADD CONSTRAINT tender_invites_tender_id_comp_id_key UNIQUE (tender_id, comp_id);


--
-- Name: tender_join_request_states_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY tender_join_request_states
    ADD CONSTRAINT tender_join_request_states_pkey PRIMARY KEY (id);


--
-- Name: tender_join_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY tender_join_requests
    ADD CONSTRAINT tender_join_requests_pkey PRIMARY KEY (id);


--
-- Name: tender_join_requests_tender_id_comp_id_key; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY tender_join_requests
    ADD CONSTRAINT tender_join_requests_tender_id_comp_id_key UNIQUE (tender_id, comp_id);


--
-- Name: tenders_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY tenders
    ADD CONSTRAINT tenders_pkey PRIMARY KEY (id);


--
-- Name: user_perm_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY user_perm
    ADD CONSTRAINT user_perm_pkey PRIMARY KEY (user_id, perm_type);


--
-- Name: user_perm_type_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY user_perm_type
    ADD CONSTRAINT user_perm_type_pkey PRIMARY KEY (perm_type);


--
-- Name: users_auths_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY users_auths
    ADD CONSTRAINT users_auths_pkey PRIMARY KEY (user_id, type);


--
-- Name: users_auths_user_id_type_key; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY users_auths
    ADD CONSTRAINT users_auths_user_id_type_key UNIQUE (user_id, type);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


SET search_path = "user", pg_catalog;

--
-- Name: passw_reocovery_pkey; Type: CONSTRAINT; Schema: user; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY passw_recovery_token
    ADD CONSTRAINT passw_reocovery_pkey PRIMARY KEY (id);


--
-- Name: user_contacts_pkey; Type: CONSTRAINT; Schema: user; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY contacts
    ADD CONSTRAINT user_contacts_pkey PRIMARY KEY (contact_id);


--
-- Name: user_invites_pkey; Type: CONSTRAINT; Schema: user; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY invites
    ADD CONSTRAINT user_invites_pkey PRIMARY KEY (user_invite_id);


SET search_path = vehicle, pg_catalog;

--
-- Name: vehicles_data_pkey; Type: CONSTRAINT; Schema: vehicle; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY vehicles_data
    ADD CONSTRAINT vehicles_data_pkey PRIMARY KEY (id);


--
-- Name: vehicles_pkey; Type: CONSTRAINT; Schema: vehicle; Owner: cargochat_u; Tablespace: 
--

ALTER TABLE ONLY vehicles_head
    ADD CONSTRAINT vehicles_pkey PRIMARY KEY (id);


SET search_path = comp, pg_catalog;

--
-- Name: fki_comp_invite_comp_id_fkey; Type: INDEX; Schema: comp; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_comp_invite_comp_id_fkey ON invites USING btree (comp_id);


SET search_path = lead, pg_catalog;

--
-- Name: registered_name_idx; Type: INDEX; Schema: lead; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX registered_name_idx ON registered USING btree (name text_pattern_ops);


SET search_path = lplace, pg_catalog;

--
-- Name: lpaces_channel_id_idx; Type: INDEX; Schema: lplace; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX lpaces_channel_id_idx ON lplaces USING btree (channel_id);


--
-- Name: lplaces_x_y_idx; Type: INDEX; Schema: lplace; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX lplaces_x_y_idx ON lplaces USING btree (x, y);


SET search_path = "order", pg_catalog;

--
-- Name: archive_comp_id_idx; Type: INDEX; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX archive_comp_id_idx ON archive USING btree (comp_id);


--
-- Name: archive_order_id_comp_id_idx; Type: INDEX; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX archive_order_id_comp_id_idx ON archive USING btree (order_id, comp_id);


--
-- Name: archive_order_id_idx; Type: INDEX; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX archive_order_id_idx ON archive USING btree (order_id);


--
-- Name: memo_order_id_comp_id_idx; Type: INDEX; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX memo_order_id_comp_id_idx ON memo USING btree (order_id, comp_id);


--
-- Name: offers_carrier_comp_id_idx; Type: INDEX; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX offers_carrier_comp_id_idx ON offers USING btree (carrier_comp_id);


--
-- Name: offers_order_id_carrier_comp_id_idx; Type: INDEX; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX offers_order_id_carrier_comp_id_idx ON offers USING btree (order_id, carrier_comp_id);


--
-- Name: offers_order_id_idx; Type: INDEX; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX offers_order_id_idx ON offers USING btree (order_id);


--
-- Name: offers_vehicle_id_idx; Type: INDEX; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX offers_vehicle_id_idx ON offers USING btree (vehicle_id);


--
-- Name: orders_ux_uy_idx; Type: INDEX; Schema: order; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX orders_ux_uy_idx ON orders USING btree (ux, uy);


SET search_path = price_req, pg_catalog;

--
-- Name: fki_price_request_bets_comp_id_fkey; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_price_request_bets_comp_id_fkey ON bets USING btree (comp_id);


--
-- Name: fki_price_request_bets_prc_comp_id_fkey; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_price_request_bets_prc_comp_id_fkey ON bets USING btree (prc_comp_id);


--
-- Name: fki_price_request_bets_price_request_id_fkey; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_price_request_bets_price_request_id_fkey ON bets USING btree (price_request_id);


--
-- Name: fki_price_request_bets_user_id_fkey; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_price_request_bets_user_id_fkey ON bets USING btree (user_id);


--
-- Name: fki_price_request_bookmarks_comp_id_fkey; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_price_request_bookmarks_comp_id_fkey ON bookmarks USING btree (comp_id);


--
-- Name: fki_price_request_bookmarks_price_request_id_fkey; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_price_request_bookmarks_price_request_id_fkey ON bookmarks USING btree (price_request_id);


--
-- Name: fki_price_request_received_comp_id_fkey; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_price_request_received_comp_id_fkey ON received USING btree (comp_id);


--
-- Name: fki_price_request_received_price_request_id_fkey; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_price_request_received_price_request_id_fkey ON received USING btree (price_request_id);


--
-- Name: fki_price_requests_comp_id_fkey; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_price_requests_comp_id_fkey ON requests USING btree (comp_id);


--
-- Name: price_request_bets_price_request_id_comp_id_idx; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX price_request_bets_price_request_id_comp_id_idx ON bets USING btree (price_request_id, comp_id);


--
-- Name: price_request_bookmarks_price_request_id_comp_id_idx; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX price_request_bookmarks_price_request_id_comp_id_idx ON bookmarks USING btree (price_request_id, comp_id);


--
-- Name: price_request_received_price_request_id_comp_id_idx; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX price_request_received_price_request_id_comp_id_idx ON received USING btree (price_request_id, comp_id);


--
-- Name: price_requests_flags_idx; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX price_requests_flags_idx ON requests USING btree (flags);


--
-- Name: price_requests_mass_idx; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX price_requests_mass_idx ON requests USING btree (mass);


--
-- Name: price_requests_volume_idx; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX price_requests_volume_idx ON requests USING btree (volume);


--
-- Name: requests_related_carriers_only_idx; Type: INDEX; Schema: price_req; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX requests_related_carriers_only_idx ON requests USING btree (related_carriers_only);


SET search_path = public, pg_catalog;

--
-- Name: comp_from_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comp_from_idx ON comp_relations USING btree (comp_from);


--
-- Name: comp_relation_requests_comp_from_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comp_relation_requests_comp_from_idx ON comp_relation_requests USING btree (comp_from);


--
-- Name: comp_relation_requests_comp_to_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comp_relation_requests_comp_to_idx ON comp_relation_requests USING btree (comp_to);


--
-- Name: comp_relation_requests_relation_type_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comp_relation_requests_relation_type_idx ON comp_relation_requests USING btree (relation_type);


--
-- Name: comp_to_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comp_to_idx ON comp_relations USING btree (comp_to);


--
-- Name: comps_addr_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comps_addr_idx ON comps USING btree (addr);


--
-- Name: comps_inn_addr_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX comps_inn_addr_idx ON comps USING btree (inn, addr) WHERE (kpp IS NULL);


--
-- Name: comps_inn_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comps_inn_idx ON comps USING btree (inn);


--
-- Name: comps_inn_kpp_addr_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX comps_inn_kpp_addr_idx ON comps USING btree (inn, kpp, addr) WHERE (kpp IS NOT NULL);


--
-- Name: comps_kpp_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comps_kpp_idx ON comps USING btree (kpp);


--
-- Name: comps_ogrn_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comps_ogrn_idx ON comps USING btree (ogrn);


--
-- Name: comps_x_y_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX comps_x_y_idx ON comps USING btree (x, y);


--
-- Name: files_deleted_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX files_deleted_idx ON files USING btree (deleted) WHERE (NOT deleted);


--
-- Name: files_temporary_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX files_temporary_idx ON files USING btree (temporary);


--
-- Name: files_token_uidx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX files_token_uidx ON files USING btree (token);


--
-- Name: fki_comp_relation_request_comp_invite_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_comp_relation_request_comp_invite_id_fkey ON comp_relation_requests USING btree (comp_invite_id);


--
-- Name: fki_comp_relation_request_requested_comp_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_comp_relation_request_requested_comp_id_fkey ON comp_relation_requests USING btree (requested_comp_id);


--
-- Name: fki_comp_relation_request_requestor_comp_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_comp_relation_request_requestor_comp_id_fkey ON comp_relation_requests USING btree (requestor_comp_id);


--
-- Name: fki_comp_tags_comp_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_comp_tags_comp_id_fkey ON comp_tags USING btree (comp_id);


--
-- Name: fki_comps_opf_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_comps_opf_fkey ON comps USING btree (opf);


--
-- Name: fki_events_event_doc_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_events_event_doc_id_fkey ON events USING btree (event_doc_id);


--
-- Name: fki_events_sid_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_events_sid_fkey ON events USING btree (sid);


--
-- Name: fki_files_user_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_files_user_id_fkey ON files USING btree (user_id);


--
-- Name: fki_keys__users__user_id__fk; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_keys__users__user_id__fk ON keys USING btree (user_id);


--
-- Name: fki_msg_channel_users_channel_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_channel_users_channel_id_fkey ON msg_channel_users USING btree (channel_id);


--
-- Name: fki_msg_channel_users_lrm_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_channel_users_lrm_id_fkey ON msg_channel_users USING btree (lrm_id);


--
-- Name: fki_msg_channel_users_user_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_channel_users_user_id_fkey ON msg_channel_users USING btree (user_id);


--
-- Name: fki_msg_channels_creator_userr_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_channels_creator_userr_id_fkey ON msg_channels USING btree (creator_user_id);


--
-- Name: fki_msg_channels_hist_from_user_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_channels_hist_from_user_id_fkey ON msg_channels_hist USING btree (user_id);


--
-- Name: fki_msg_channels_hist_to_channel_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_channels_hist_to_channel_id_fkey ON msg_channels_hist USING btree (channel_id);


--
-- Name: fki_msg_private_hist_private_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_private_hist_private_id_fkey ON msg_private_hist USING btree (private_id);


--
-- Name: fki_msg_private_hist_user_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_private_hist_user_id_fkey ON msg_private_hist USING btree (user_id);


--
-- Name: fki_msg_privates_user1_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_privates_user1_id_fkey ON msg_privates USING btree (user1_id);


--
-- Name: fki_msg_privates_user1_lrm_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_privates_user1_lrm_id_fkey ON msg_privates USING btree (user1_lrm_id);


--
-- Name: fki_msg_privates_user2_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_privates_user2_id_fkey ON msg_privates USING btree (user2_id);


--
-- Name: fki_msg_privates_user2_lrm_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_msg_privates_user2_lrm_id_fkey ON msg_privates USING btree (user2_lrm_id);


--
-- Name: fki_perms_comp_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_perms_comp_id_fkey ON perms USING btree (comp_id);


--
-- Name: fki_perms_perm_type_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_perms_perm_type_fkey ON perms USING btree (perm_type);


--
-- Name: fki_rt_comp_tender_tender_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_rt_comp_tender_tender_id_fkey ON rt_comp_tender USING btree (tender_id);


--
-- Name: fki_rt_user_perm_perm_type_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_rt_user_perm_perm_type_fkey ON user_perm USING btree (perm_type);


--
-- Name: fki_tender_invites_comp_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_tender_invites_comp_id_fkey ON tender_invites USING btree (comp_id);


--
-- Name: fki_tender_invites_state_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_tender_invites_state_fkey ON tender_invites USING btree (state);


--
-- Name: fki_tender_invites_tender_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_tender_invites_tender_id_fkey ON tender_invites USING btree (tender_id);


--
-- Name: fki_tender_join_requests_comp_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_tender_join_requests_comp_id_fkey ON tender_join_requests USING btree (comp_id);


--
-- Name: fki_tender_join_requests_state_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_tender_join_requests_state_fkey ON tender_join_requests USING btree (state);


--
-- Name: fki_tender_join_requests_tender_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_tender_join_requests_tender_id_fkey ON tender_join_requests USING btree (tender_id);


--
-- Name: fki_tenders_comp_id_fk; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_tenders_comp_id_fk ON tenders USING btree (owner_comp_id);


--
-- Name: fki_users_user_id_fkey; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_users_user_id_fkey ON sessions USING btree (user_id);


--
-- Name: keys_state_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX keys_state_idx ON keys USING btree (state);


--
-- Name: msg_channel_users_channel_id_user_id_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX msg_channel_users_channel_id_user_id_idx ON msg_channel_users USING btree (channel_id, user_id);


--
-- Name: msg_privates_user1_id_user2_id_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX msg_privates_user1_id_user2_id_idx ON msg_privates USING btree (user1_id, user2_id);


--
-- Name: perm_types_alias_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX perm_types_alias_idx ON perm_types USING btree (alias);


--
-- Name: relation_id_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX relation_id_idx ON comp_relations USING btree (relation_id);


--
-- Name: relation_type_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX relation_type_idx ON comp_relations USING btree (relation_type);


--
-- Name: sessions_id_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX sessions_id_idx ON sessions USING btree (id);


--
-- Name: sessions_sid_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX sessions_sid_idx ON sessions USING btree (sid);


--
-- Name: tenders_owner_comp_id_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX tenders_owner_comp_id_idx ON tenders USING btree (owner_comp_id);


--
-- Name: user_perm_type_alias_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX user_perm_type_alias_idx ON user_perm_type USING btree (alias);


--
-- Name: users_auth_type_key_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX users_auth_type_key_idx ON users_auths USING btree (type, key);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX users_email_idx ON users USING btree (email text_pattern_ops);


--
-- Name: users_first_name_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX users_first_name_idx ON users USING btree (first_name COLLATE "C.UTF-8" text_pattern_ops);


--
-- Name: users_last_name_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX users_last_name_idx ON users USING btree (last_name COLLATE "C.UTF-8" text_pattern_ops);


--
-- Name: users_pat_name_idx; Type: INDEX; Schema: public; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX users_pat_name_idx ON users USING btree (pat_name COLLATE "C.UTF-8" text_pattern_ops);


SET search_path = "user", pg_catalog;

--
-- Name: fki_user_contacts_contact_user_id_fk; Type: INDEX; Schema: user; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_user_contacts_contact_user_id_fk ON contacts USING btree (contact_user_id);


--
-- Name: fki_user_contacts_user_id_fkey; Type: INDEX; Schema: user; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_user_contacts_user_id_fkey ON contacts USING btree (user_id);


--
-- Name: fki_user_invites_comp_id_fkey; Type: INDEX; Schema: user; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX fki_user_invites_comp_id_fkey ON invites USING btree (comp_id);


--
-- Name: user_contacts_user_id_contact_user_id_unique_idx; Type: INDEX; Schema: user; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX user_contacts_user_id_contact_user_id_unique_idx ON contacts USING btree (user_id, contact_user_id);


--
-- Name: user_invites_email_idx; Type: INDEX; Schema: user; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX user_invites_email_idx ON invites USING btree (email);


--
-- Name: user_invites_token_idx; Type: INDEX; Schema: user; Owner: cargochat_u; Tablespace: 
--

CREATE UNIQUE INDEX user_invites_token_idx ON invites USING btree (token);


SET search_path = vehicle, pg_catalog;

--
-- Name: vehicles_head_deleted_idx; Type: INDEX; Schema: vehicle; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX vehicles_head_deleted_idx ON vehicles_head USING btree (deleted) WHERE (NOT deleted);


--
-- Name: vehicles_model_idx; Type: INDEX; Schema: vehicle; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX vehicles_model_idx ON vehicles_head USING btree (model text_pattern_ops);


--
-- Name: vehicles_num_idx; Type: INDEX; Schema: vehicle; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX vehicles_num_idx ON vehicles_head USING btree (num text_pattern_ops);


--
-- Name: vehicles_type_idx; Type: INDEX; Schema: vehicle; Owner: cargochat_u; Tablespace: 
--

CREATE INDEX vehicles_type_idx ON vehicles_head USING btree (type text_pattern_ops);


SET search_path = comp, pg_catalog;

--
-- Name: trigger_comp_invite_after_insert; Type: TRIGGER; Schema: comp; Owner: cargochat_u
--

CREATE TRIGGER trigger_comp_invite_after_insert BEFORE INSERT ON invites FOR EACH ROW EXECUTE PROCEDURE trigger_comp_invite_after_insert();


SET search_path = "order", pg_catalog;

--
-- Name: trigger_orders_after_state; Type: TRIGGER; Schema: order; Owner: cargochat_u
--

CREATE TRIGGER trigger_orders_after_state AFTER INSERT OR DELETE OR UPDATE OF state1 ON orders FOR EACH ROW EXECUTE PROCEDURE trigger_orders_after_state();


SET search_path = price_req, pg_catalog;

--
-- Name: trigger_bets_change; Type: TRIGGER; Schema: price_req; Owner: cargochat_u
--

CREATE TRIGGER trigger_bets_change AFTER INSERT OR DELETE OR UPDATE OF price_request_id ON bets FOR EACH ROW EXECUTE PROCEDURE trigger_bets_change();


SET search_path = public, pg_catalog;

--
-- Name: tr_comp_id; Type: TRIGGER; Schema: public; Owner: cargochat_u
--

CREATE CONSTRAINT TRIGGER tr_comp_id AFTER INSERT OR DELETE OR UPDATE OF comp_id ON users NOT DEFERRABLE INITIALLY IMMEDIATE FOR EACH ROW EXECUTE PROCEDURE "user".trigger_user_comp_id();


--
-- Name: trigger_comp_relations_after; Type: TRIGGER; Schema: public; Owner: cargochat_u
--

CREATE TRIGGER trigger_comp_relations_after AFTER INSERT OR DELETE OR UPDATE ON comp_relations FOR EACH ROW EXECUTE PROCEDURE comp.trigger_comp_relations();


--
-- Name: trigger_msg_channel_users_change; Type: TRIGGER; Schema: public; Owner: cargochat_u
--

CREATE TRIGGER trigger_msg_channel_users_change AFTER INSERT OR DELETE OR UPDATE OF channel_id ON msg_channel_users FOR EACH ROW EXECUTE PROCEDURE channels.trigger_msg_channel_users_change();


SET search_path = vehicle, pg_catalog;

--
-- Name: comp_vehicle_updater; Type: TRIGGER; Schema: vehicle; Owner: cargochat_u
--

CREATE TRIGGER comp_vehicle_updater AFTER INSERT OR DELETE OR UPDATE OF comp_id, type ON vehicles_head FOR EACH ROW EXECUTE PROCEDURE comp.trigger_comp_vehicle_updater();


--
-- Name: vehice_file_checker; Type: TRIGGER; Schema: vehicle; Owner: cargochat_u
--

CREATE TRIGGER vehice_file_checker AFTER DELETE OR UPDATE OF sts, pts ON vehicles_head FOR EACH ROW EXECUTE PROCEDURE trigger_vehicles_files_checker();


SET search_path = comp, pg_catalog;

--
-- Name: comp_invite_comp_id_fkey; Type: FK CONSTRAINT; Schema: comp; Owner: cargochat_u
--

ALTER TABLE ONLY invites
    ADD CONSTRAINT comp_invite_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


SET search_path = lead, pg_catalog;

--
-- Name: registered_comp_id_fkey; Type: FK CONSTRAINT; Schema: lead; Owner: cargochat_u
--

ALTER TABLE ONLY registered
    ADD CONSTRAINT registered_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


SET search_path = lplace, pg_catalog;

--
-- Name: lpaces_channel_id_fkey; Type: FK CONSTRAINT; Schema: lplace; Owner: cargochat_u
--

ALTER TABLE ONLY lplaces
    ADD CONSTRAINT lpaces_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.msg_channels(channel_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: lpaces_comp_id_fkey; Type: FK CONSTRAINT; Schema: lplace; Owner: cargochat_u
--

ALTER TABLE ONLY lplaces
    ADD CONSTRAINT lpaces_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


SET search_path = "order", pg_catalog;

--
-- Name: archive_comp_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY archive
    ADD CONSTRAINT archive_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: archive_order_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY archive
    ADD CONSTRAINT archive_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: memo_comp_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY memo
    ADD CONSTRAINT memo_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: memo_order_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY memo
    ADD CONSTRAINT memo_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: offers_carrier_comp_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY offers
    ADD CONSTRAINT offers_carrier_comp_id_fkey FOREIGN KEY (carrier_comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: offers_driver_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY offers
    ADD CONSTRAINT offers_driver_fkey FOREIGN KEY (driver) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: offers_order_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY offers
    ADD CONSTRAINT offers_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: offers_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY offers
    ADD CONSTRAINT offers_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES vehicle.vehicles_head(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_carrier_comp_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_carrier_comp_id_fkey FOREIGN KEY (carrier_comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: orders_comp_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_driver_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_driver_fkey FOREIGN KEY (driver) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: orders_expeditor_comp_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_expeditor_comp_id_fkey FOREIGN KEY (exp_comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: orders_lplace_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_lplace_id_fkey FOREIGN KEY (lplace_id) REFERENCES lplace.lplaces(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: orders_shipper_comp_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_shipper_comp_id_fkey FOREIGN KEY (shipper_comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: order; Owner: cargochat_u
--

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES vehicle.vehicles_head(id) ON UPDATE CASCADE ON DELETE SET NULL;


SET search_path = price_req, pg_catalog;

--
-- Name: price_request_bets_comp_id_fkey; Type: FK CONSTRAINT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY bets
    ADD CONSTRAINT price_request_bets_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price_request_bets_prc_comp_id_fkey; Type: FK CONSTRAINT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY bets
    ADD CONSTRAINT price_request_bets_prc_comp_id_fkey FOREIGN KEY (prc_comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price_request_bets_price_request_id_fkey; Type: FK CONSTRAINT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY bets
    ADD CONSTRAINT price_request_bets_price_request_id_fkey FOREIGN KEY (price_request_id) REFERENCES requests(price_request_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price_request_bets_user_id_fkey; Type: FK CONSTRAINT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY bets
    ADD CONSTRAINT price_request_bets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: price_request_bookmarks_comp_id_fkey; Type: FK CONSTRAINT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY bookmarks
    ADD CONSTRAINT price_request_bookmarks_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price_request_bookmarks_price_request_id_fkey; Type: FK CONSTRAINT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY bookmarks
    ADD CONSTRAINT price_request_bookmarks_price_request_id_fkey FOREIGN KEY (price_request_id) REFERENCES requests(price_request_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price_request_received_comp_id_fkey; Type: FK CONSTRAINT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY received
    ADD CONSTRAINT price_request_received_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price_request_received_price_request_id_fkey; Type: FK CONSTRAINT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY received
    ADD CONSTRAINT price_request_received_price_request_id_fkey FOREIGN KEY (price_request_id) REFERENCES requests(price_request_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price_requests_comp_id_fkey; Type: FK CONSTRAINT; Schema: price_req; Owner: cargochat_u
--

ALTER TABLE ONLY requests
    ADD CONSTRAINT price_requests_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


SET search_path = public, pg_catalog;

--
-- Name: comp_from_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_relations
    ADD CONSTRAINT comp_from_fkey FOREIGN KEY (comp_from) REFERENCES comps(id) ON DELETE CASCADE;


--
-- Name: comp_relation_request_comp_invite_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_relation_requests
    ADD CONSTRAINT comp_relation_request_comp_invite_id_fkey FOREIGN KEY (comp_invite_id) REFERENCES comp.invites(invite_id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: comp_relation_request_requested_comp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_relation_requests
    ADD CONSTRAINT comp_relation_request_requested_comp_id_fkey FOREIGN KEY (requested_comp_id) REFERENCES comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comp_relation_request_requestor_comp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_relation_requests
    ADD CONSTRAINT comp_relation_request_requestor_comp_id_fkey FOREIGN KEY (requestor_comp_id) REFERENCES comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comp_relation_requests_comp_from_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_relation_requests
    ADD CONSTRAINT comp_relation_requests_comp_from_fkey FOREIGN KEY (comp_from) REFERENCES comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comp_relation_requests_comp_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_relation_requests
    ADD CONSTRAINT comp_relation_requests_comp_to_fkey FOREIGN KEY (comp_to) REFERENCES comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comp_tags_comp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_tags
    ADD CONSTRAINT comp_tags_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comp_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY comp_relations
    ADD CONSTRAINT comp_to_fkey FOREIGN KEY (comp_to) REFERENCES comps(id) ON DELETE CASCADE;


--
-- Name: events_event_doc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_event_doc_id_fkey FOREIGN KEY (event_doc_id) REFERENCES event_docs(event_doc_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: events_sid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY events
    ADD CONSTRAINT events_sid_fkey FOREIGN KEY (sid) REFERENCES sessions(sid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: files_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY files
    ADD CONSTRAINT files_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: keys__users__user_id__fk; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY keys
    ADD CONSTRAINT keys__users__user_id__fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: msg_channel_users_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_channel_users
    ADD CONSTRAINT msg_channel_users_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES msg_channels(channel_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: msg_channel_users_lrm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_channel_users
    ADD CONSTRAINT msg_channel_users_lrm_id_fkey FOREIGN KEY (lrm_id) REFERENCES msg_channels_hist(message_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: msg_channel_users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_channel_users
    ADD CONSTRAINT msg_channel_users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: msg_channels_creator_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_channels
    ADD CONSTRAINT msg_channels_creator_user_id_fkey FOREIGN KEY (creator_user_id) REFERENCES users(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: msg_channels_hist_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_channels_hist
    ADD CONSTRAINT msg_channels_hist_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES msg_channels(channel_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: msg_channels_hist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_channels_hist
    ADD CONSTRAINT msg_channels_hist_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: msg_private_hist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_private_hist
    ADD CONSTRAINT msg_private_hist_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: msg_privates_user1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_privates
    ADD CONSTRAINT msg_privates_user1_id_fkey FOREIGN KEY (user1_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: msg_privates_user1_lrm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_privates
    ADD CONSTRAINT msg_privates_user1_lrm_id_fkey FOREIGN KEY (user1_lrm_id) REFERENCES msg_private_hist(message_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: msg_privates_user2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_privates
    ADD CONSTRAINT msg_privates_user2_id_fkey FOREIGN KEY (user2_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: msg_privates_user2_lrm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY msg_privates
    ADD CONSTRAINT msg_privates_user2_lrm_id_fkey FOREIGN KEY (user2_lrm_id) REFERENCES msg_private_hist(message_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: perms_comp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY perms
    ADD CONSTRAINT perms_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES comps(id) ON DELETE CASCADE;


--
-- Name: perms_perm_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY perms
    ADD CONSTRAINT perms_perm_type_fkey FOREIGN KEY (perm_type) REFERENCES perm_types(type) ON DELETE CASCADE;


--
-- Name: perms_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY perms
    ADD CONSTRAINT perms_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: rt_comp_tender_comp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY rt_comp_tender
    ADD CONSTRAINT rt_comp_tender_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES comps(id) ON DELETE CASCADE;


--
-- Name: rt_comp_tender_tender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY rt_comp_tender
    ADD CONSTRAINT rt_comp_tender_tender_id_fkey FOREIGN KEY (tender_id) REFERENCES tenders(id) ON DELETE CASCADE;


--
-- Name: tender_invites_comp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tender_invites
    ADD CONSTRAINT tender_invites_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES comps(id) ON DELETE CASCADE;


--
-- Name: tender_invites_state_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tender_invites
    ADD CONSTRAINT tender_invites_state_fkey FOREIGN KEY (state) REFERENCES tender_invite_states(id) ON DELETE CASCADE;


--
-- Name: tender_invites_tender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tender_invites
    ADD CONSTRAINT tender_invites_tender_id_fkey FOREIGN KEY (tender_id) REFERENCES tenders(id) ON DELETE CASCADE;


--
-- Name: tender_join_requests_comp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tender_join_requests
    ADD CONSTRAINT tender_join_requests_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES comps(id) ON DELETE CASCADE;


--
-- Name: tender_join_requests_state_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tender_join_requests
    ADD CONSTRAINT tender_join_requests_state_fkey FOREIGN KEY (state) REFERENCES tender_join_request_states(id) ON DELETE CASCADE;


--
-- Name: tender_join_requests_tender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tender_join_requests
    ADD CONSTRAINT tender_join_requests_tender_id_fkey FOREIGN KEY (tender_id) REFERENCES tenders(id) ON DELETE CASCADE;


--
-- Name: tenders_comp_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY tenders
    ADD CONSTRAINT tenders_comp_id_fk FOREIGN KEY (owner_comp_id) REFERENCES comps(id) ON DELETE CASCADE;


--
-- Name: user_perm_perm_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY user_perm
    ADD CONSTRAINT user_perm_perm_type_fkey FOREIGN KEY (perm_type) REFERENCES user_perm_type(perm_type) ON DELETE CASCADE;


--
-- Name: user_perm_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY user_perm
    ADD CONSTRAINT user_perm_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: users_auth_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY users_auths
    ADD CONSTRAINT users_auth_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: users_comp_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES comps(id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- Name: users_sessions_fk; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT users_sessions_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


--
-- Name: users_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: cargochat_u
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT users_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


SET search_path = "user", pg_catalog;

--
-- Name: passw_reocovery_token_user_id_fkey; Type: FK CONSTRAINT; Schema: user; Owner: cargochat_u
--

ALTER TABLE ONLY passw_recovery_token
    ADD CONSTRAINT passw_reocovery_token_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_contacts_contact_user_id_fk; Type: FK CONSTRAINT; Schema: user; Owner: cargochat_u
--

ALTER TABLE ONLY contacts
    ADD CONSTRAINT user_contacts_contact_user_id_fk FOREIGN KEY (contact_user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_contacts_user_id_fk; Type: FK CONSTRAINT; Schema: user; Owner: cargochat_u
--

ALTER TABLE ONLY contacts
    ADD CONSTRAINT user_contacts_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_invites_comp_id_fkey; Type: FK CONSTRAINT; Schema: user; Owner: cargochat_u
--

ALTER TABLE ONLY invites
    ADD CONSTRAINT user_invites_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


SET search_path = vehicle, pg_catalog;

--
-- Name: vehicles_comp_id_fkey; Type: FK CONSTRAINT; Schema: vehicle; Owner: cargochat_u
--

ALTER TABLE ONLY vehicles_head
    ADD CONSTRAINT vehicles_comp_id_fkey FOREIGN KEY (comp_id) REFERENCES public.comps(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

