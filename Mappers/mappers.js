// const Form = require('../Models/Form');

// function formMapper(req){
//     let form = new Form();

//     form.index_key = req.body.index_key;
//     form.theme = req.body.theme;
//     form.itss= req.body.itss;
//     form.rpp = req.body.rpp;
//     form.theme_name =  req.body.theme_name;
//     form.project_name =  req.body.project_name;
//     form.project_description =  req.body.project_description;
//     form.caputure_date =  req.body.caputure_date;
//     form.impacts_bpm =  req.body.impacts_bpm;
//     form.impacts_pubsub =  req.body.impacts_pubsub;
//     form.impacts_support = req.body.impacts_support;
//     form.impacts_tmf =  req.body.impacts_support;
//     form.impacts_tocp =  req.body.impacts_tocp;
//     form.team_arch =  req.body.team_arch;
//     form.team_arch_estimate  =  req.body.team_arch_estimate;
//     form.team_arch_hw_estimate =  req.body.team_arch_hw_estimate;
//     form.team_bsa =  req.body.team_bsa;
//     form.team_bsa_estimate =  req.body.team_bsa_hw_estimate;
//     form.team_bsa_hw_estimate  =  req.body.team_bsa_hw_estimate;
//     form.project_status =  req.body.project_status;
//     form.asked_release =  req.body.asked_release;
//     form.actual_release =  req.body.actual_release;
//     form.stack =  req.body.stack
//     form.project_manager =  req.body.project_manager;
//     form.e2e_architect =  req.body.e2e_architect;
//     form.business_prime =  req.body.business_prime;
//     form.modules =  req.body.modules;

//     return form;
    
// }


// function dbFormMapper(form){
//     return{
//     index_key: form.index_key,
//     theme : form.theme,
//     itss: form.itss,
//     rpp:form.rpp,
//     theme_name: form.theme_name,
//     project_name:form.project_name,
//     project_description: form.project_description,
//     caputure_date: form.caputure_date,
//     impacts_bpm: form.impacts_bpm,
//     impacts_pubsub: form.impacts_pubsub,
//     impacts_support: form.impacts_support,
//     impacts_tmf: form.impacts_tmf, 
//     impacts_tocp: form.impacts_tocp,
//     team_arch: form.team_arch, 
//     team_arch_estimate: form.team_arch_estimate,
//     team_arch_hw_estimate: form.team_arch_hw_estimate,
//     team_bsa: form.team_bsa,
//     team_bsa_estimate: form.team_bsa_estimate,
//     team_bsa_hw_estimate: form.team_bsa_hw_estimate,
//     project_status: form.project_status, 
//     asked_release: form.asked_release,
//     actual_release: form.actual_release,
//     stack: form.stack, 
//     project_manager: form.project_manager,
//     e2e_architect: form.e2e_architect,
//     business_prime: form.business_prime,
//     modules: form.modules,
//     }
// }

// module.exports = {formMapper, dbFormMapper};