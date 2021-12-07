#include <dpp/dpp.h>
#include <iostream>
#include <dpp/fmt/format.h>



int main()
{
    dpp::cluster bot("ODM2NjA2NjkzMzQ4OTk5MjQ4.YIgcsw.LnFgvO9EWPowdseu8gWXdhX4uLU");

    /* The interaction create event is fired when someone issues your commands */
    bot.on_interaction_create([&bot](const dpp::interaction_create_t & event) {
        if (event.command.type == dpp::it_application_command) {
            dpp::command_interaction cmd_data = std::get<dpp::command_interaction>(event.command.data);
            /* Check which command they ran */
            if (cmd_data.name == "blep") {
                /* Fetch a parameter value from the command parameters */
                std::string animal = std::get<std::string>(event.get_parameter("animal"));
                /* Reply to the command. There is an overloaded version of this
                * call that accepts a dpp::message so you can send embeds.
                */
                event.reply(dpp::ir_channel_message_with_source, fmt::format("Blep! You chose {}", animal));
            }
        }
    });

    bot.on_ready([&bot](const dpp::ready_t & event) {
        dpp::slashcommand newcommand;
        /* Create a new global command on ready event */
        newcommand.set_name("blep")
            .set_description("Send a random adorable animal photo")
            .set_application_id(bot.me.id)
            .add_option(
                dpp::command_option(dpp::co_string, "animal", "The type of animal", true).
                    add_choice(dpp::command_option_choice("Dog", std::string("animal_dog"))).
                    add_choice(dpp::command_option_choice("Cat", std::string("animal_cat"))).
                    add_choice(dpp::command_option_choice("Penguin", std::string("animal_penguin"))).
                    add_choice(dpp::command_option_choice("Can", std::string("animal_can"))
            )
        );
        long unsigned int guild_id = 690898633893085244;
        /* Register the command */
        bot.guild_command_create(newcommand, guild_id);
        std::cout << "Logged in as " << bot.me.username << "!\n";
    });

    bot.on_message_create([&bot](const dpp::message_create_t & event) {
        if (event.msg->content == "!ping") {
            bot.message_create(dpp::message(event.msg->channel_id, "Pong!"));
            std::cout << "message eventine girildi!";
        }
        if (event.msg->content == "!kont") {
            // dpp::user * u = dpp::find_user(event.msg->author->id);
            long unsigned int role_id = 690902019937927199;
            bot.guild_member_add_role(event.msg->guild_id, event.msg->author->id, role_id);
            std::cout << "Called Kont";
        }
        if (event.msg->content == "!kontdel") {
            // dpp::user * u = dpp::find_user(event.msg->author->id);
            long unsigned int role_id = 690902019937927199;
            bot.guild_member_delete_role(event.msg->guild_id, event.msg->author->id, role_id);
            std::cout << "Called Kontdel";
        }
        if (event.msg->content == "sa") {
            bot.message_create(dpp::message(event.msg->channel_id, "**Aleyküm Selam, Hoş geldin ^-^**"));
        }
        
    });

    bot.start(false);
    return 0;
}